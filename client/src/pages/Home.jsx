import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import PostCardFeatured from '../components/PostCardFeatured';
import { FiArrowRight } from 'react-icons/fi';
import { Carousel } from "flowbite-react";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [postsFeatured, setPostsFeatured] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts?isFeatured=false');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  {/* Get featured posts function. Keep in mind in home page I'm reversing the list of featured posts to order them in a pyramid shape on larger screen sizes,
      so this function sorts by oldest first */ }
  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      const resFeatured = await fetch('/api/post/getPosts?isFeatured=true&sort=asc');
      const dataFeatured = await resFeatured.json();
      setPostsFeatured(dataFeatured.posts);
    };
    fetchFeaturedPosts();
  }, []);


  return (
    <div className='w-full min-h-screen'>

      {/* Homepage Banner - under the navbar image */}
      <div className="w-full relative transition-all duration-300"> 
        <img className='w-full dark:hidden' src='/BannerResized.png' alt='banner'/>
        <img className='w-full hidden dark:inline' src='/BannerResizedNight.png' alt='banner' /> 
        <div className="absolute inset-x-0 top-5 sm:top-14 md:top-14 lg:top-16 xl:top-24 flex items-center justify-center">
          <h2 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold drop-shadow-[0_0_8px_rgba(0,0,0,1)]">Welcome to my Blog</h2>
        </div>
        <div className='hidden absolute bottom-5 left-5 sm:flex flex-col'>
          <h2 className='text-gray-300 text-xs lg:text-md xl:text-lg font-mono'> Original Photo By: My loving wife</h2>
          <h2 className='text-gray-300 text-xs lg:text-md xl:text-lg font-mono'> Location: Staten Island overlooking Verrazzano Bridge</h2>
        </div>
      </div>

      {/* Intro Container */}
      <div className='dark:bg-black dark:bg-opacity-40 border-b-[1px] border-gray-300 dark:border-gray-700 mx-auto py-10 px-5 flex flex-col sm:flex-row gap-8 justify-center'>

        <div className=' border-gray-300 dark:border-gray-700 max-w-6xl flex-1 p-5 '>
          <h1 className='text-2xl font-semibold text-center py-2'>About The Author</h1>
          <p className='text-center font-semibold py-2'>Hello, there! I'm Szymon Pozniewski (pronounced: Shh-mohn)</p> 
          <p>I'm a fullstack web and software developer from New York City and Poland.
            As an artist and developer I enjoy designing all kinds of products and love the entire process of bringing ideas to life. This blog is here
            to document my journey as I learn, experiment and make mistakes during this creation process. </p>
          <Link to='/about' className='flex items-center gap-2 py-5 justify-center text-sky-700 dark:text-sky-500 hover:underline' >Learn more about me and the blog <FiArrowRight /></Link>
        </div>

        <div className='h-[300px] sm:w-[300px] flex justify-center items-center'>
          <Carousel slide={false} className=''>
            <img className='w-[300px] h-auto aspect-square' src='/About.png' alt='' />
            <img className='w-[300px] h-auto aspect-square' src='/About2.png' alt='' />
          </Carousel>
        </div>  
      

      </div>

      {/* Posts Container */}
      <div className='min-h-screen sm:mx-5 2xl:mx-40 px-3 pb-14 pt-24 flex flex-col gap-8 dark:bg-black dark:bg-opacity-40 '>
        
        {/* Featured Posts */}
        {postsFeatured && postsFeatured.length > 0 && (
          <div className='flex flex-col sm:items-center gap-6 '>

            <h2 className='text-2xl font-semibold text-center text-orange-300'>Featured Posts</h2>

            <div className='max-w-[90rem] flex flex-wrap-reverse gap-6 justify-center'>
              {postsFeatured.map((post) => (
                <PostCardFeatured key={post._id} post={post} />
              ))}
            </div>

          </div>
        )}
        
        {/* Recent Posts */}
        {posts && posts.length < 1 && (
          <div className='my-10 flex justify-center'>
            <h1>No Posts to show</h1>
          </div>
        )}
        {posts && posts.length > 0 && (
          <div className='flex flex-col sm:items-center gap-6 my-10'>

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
              View all Posts
            </Link>
          </div>
        )}


      </div>



    </div>
  )
}
