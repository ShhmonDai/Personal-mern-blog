import { Modal, Table, Button, Flowbite } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { set } from 'mongoose';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from "react-icons/fa";

const customModalTheme = {
  modal: {
    "root": {
      "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 backdrop-blur",
        "off": "hidden"
      },
      "sizes": {
        "sm": "max-w-sm",
        "md": "max-w-md",
        "lg": "max-w-lg",
        "xl": "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl"
      },
      "positions": {
        "top-left": "items-start justify-start",
        "top-center": "items-start justify-center",
        "top-right": "items-start justify-end",
        "center-left": "items-center justify-start",
        "center": "items-center justify-center",
        "center-right": "items-center justify-end",
        "bottom-right": "items-end justify-end",
        "bottom-center": "items-end justify-center",
        "bottom-left": "items-end justify-start"
      }
    },
    "content": {
      "base": "relative h-full w-full p-4 md:h-auto",
      "inner": "relative rounded-lg backdrop-blur bg-[rgba(0,0,0,0.0.1)] shadow dark:bg-[rgba(0,0,0,0.1)] flex flex-col max-h-[90vh]"
    },
    "body": {
      "base": "p-6 flex-1 overflow-auto",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
      "popup": "p-2 border-b-0",
      "title": "text-xl font-medium text-gray-900 dark:text-white",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        "icon": "h-5 w-5"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      "popup": "border-t"
    }
  }
};


export default function DashPosts() {

  const { currentUser } = useSelector((state) => state.user);
  const [ userPosts, setUserPosts] = useState([]);
  console.log(userPosts); 
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar lg:scrollbar-none scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <Flowbite theme={{ theme: customModalTheme }}>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
           <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Featured</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
           </Table.Head>

           {userPosts.map((post) => (
             <Table.Body key={post.id} className='divide-y'>
               <Table.Row className='bg-white dark:border-gray-700 dark:bg-black dark:bg-opacity-30'>
                 <Table.Cell key={post.updatedAt}>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell key={post.image}>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                    </Link>
                  </Table.Cell>
                  <Table.Cell key={post.title}>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                 <Table.Cell>
                   {post.isFeatured ? (
                     <FaCheck className='text-green-500' />
                   ) : (
                     <FaTimes className='text-red-500' />
                   )}
                 </Table.Cell>
                  <Table.Cell>
                   <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={() => {
                     setShowModal(true);
                     setPostIdToDelete(post._id);
                   }}>
                      Delete
                    </span>
                  </Table.Cell>
                 <Table.Cell>
                    <Link className='text-teal-500 hover:underline cursor-pointer' to={`/update-post/${post._id}`}><span>Edit</span></Link>
                 </Table.Cell>


              </Table.Row>
            </Table.Body> 
           ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p> You have no posts yet!</p>
      )}

      <Modal dismissible show={showModal} onClose={() => setShowModal(false)} popup size='md' >

        <Modal.Header className='bg-[rgba(0,0,0,0.3)]' />
        <Modal.Body className='bg-[rgba(0,0,0,0.3)]'>
          <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-white dark:text-white'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost} >
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>



      
    </Flowbite>

      {
        currentUser.isAdmin && (
          <Link to={'/create-post'} className='flex justify-center mt-5 mb-20'>
            <Button type='button' gradientDuoTone='pinkToOrange' className='w-full'> Create a post</Button>
          </Link>
        )
      }
    
    </div>


  );
}