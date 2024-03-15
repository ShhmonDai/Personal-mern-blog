import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);


  return (
    <div className='w-full min-h-screen'>

      <div className="w-full relative"> 
        <img className='w-full' src='/Banner1.jpg' alt='header'/> 
        <div className="absolute inset-x-0 top-5 sm:top-14 md:top-14 lg:top-16 xl:top-24 flex items-center justify-center">
            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold drop-shadow-md">Welcome to my Blog</h2>
        </div>
        <div className='hidden absolute bottom-5 left-5 sm:flex flex-col'>
          <h2 className='text-gray-300 text-xs lg:text-md xl:text-lg font-mono'> Photo By: My loving wife</h2>
          <h2 className='text-gray-300 text-xs lg:text-md xl:text-lg font-mono'> Location: Staten Island overlooking Verrazano Bridge</h2>
        </div>
      </div>

      <div className='dark:bg-black dark:bg-opacity-40 border-b-[1px] border-gray-300 dark:border-gray-700 mx-auto py-10 px-5 flex flex-col items-center gap-8'>
        <div className='text-lg md:text-2xl font-semibold text-center'>If you are a new visitor 
        please check out the 
        
        <Link
          to={'/about'}
            className='text-lg md:text-2xl text-teal-500 hover:underline mx-2'
        >
          About
        </Link>
         page
       </div>

        <div className='text-lg md:text-2xl font-semibold text-center'>Otherwise, scroll down to see
         the most recent posts.
        </div>

        <div className='text-lg md:text-2xl font-semibold text-center'>Additionally, you can browse by blog

          <Link
            to={'/categories'}
            className='text-lg md:text-2xl text-teal-500 hover:underline mx-2'
          >
            Categories
          </Link>
          ,

          <Link
            to={'/search'}
            className='text-lg md:text-2xl text-teal-500 hover:underline mx-2'
          >
            Search By Keywords
          </Link>
           or see 
          <Link
            to={'/posts'}
            className='text-lg md:text-2xl text-teal-500 hover:underline mx-2'
          >
            All Posts
          </Link>

        </div>

      </div>


      <div className='sm:mx-5 2xl:mx-40 px-3 pb-7 pt-16 flex flex-col gap-8 dark:bg-black dark:bg-opacity-40 '>
        {posts && posts.length > 0 && (
          <div className='flex flex-col sm:items-center gap-6 '>

            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>

            <div className='max-w-[90rem] flex flex-wrap gap-6 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={'/posts'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>



    </div>
  )
}
