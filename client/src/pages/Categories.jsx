import { Link } from 'react-router-dom';


export default function Categories() {
  return (
    <div className='w-full min-h-screen'>

      <div className="sm:mx-5 2xl:mx-40 px-3 pb-7 pt-16 flex flex-col gap-8 min-h-screen items-center dark:bg-black dark:bg-opacity-40 ">
        
        <h2 className='text-2xl font-semibold text-center'>Post Categories</h2> 
        
        {/*Category Card Container */}
        <div className='max-w-[90rem] flex flex-wrap gap-6 justify-center'>

          {/*Category Card 1 */}
          <div className='dark:bg-black dark:bg-opacity-20 group relative w-full border border-sky-700 hover:border-2 h-[320px] overflow-hidden sm:w-[430px] transition-all duration-300 drop-shadow-md'>
          <Link to={`/search`}>
            <img
              src=''
              alt='category'
              className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
            />
          </Link>
          <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-2 text-center'>CATEGORY</p>

            <Link
              to={`/search`}
              className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-sky-500 text-sky-500 hover:bg-sky-500 dark:text-sky-200 dark:hover:text-slate-900 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
            >
              EXPLORE
            </Link>
          </div>
          </div>
          {/*Category Card 2 */}
          <div className='dark:bg-black dark:bg-opacity-20 group relative w-full border border-sky-700 hover:border-2 h-[320px] overflow-hidden sm:w-[430px] transition-all duration-300 drop-shadow-md'>
            <Link to={`/search`}>
              <img
                src=''
                alt='category'
                className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
              />
            </Link>
            <div className='p-3 flex flex-col gap-2'>
              <p className='text-lg font-semibold line-clamp-2 text-center'>CATEGORY</p>

              <Link
                to={`/search`}
                className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-sky-500 text-sky-500 hover:bg-sky-500 dark:text-sky-200 dark:hover:text-slate-900 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
              >
                EXPLORE
              </Link>
            </div>
          </div>
          {/*Category Card 3 */}
          <div className='dark:bg-black dark:bg-opacity-20 group relative w-full border border-sky-700 hover:border-2 h-[320px] overflow-hidden sm:w-[430px] transition-all duration-300 drop-shadow-md'>
            <Link to={`/search`}>
              <img
                src=''
                alt='category'
                className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
              />
            </Link>
            <div className='p-3 flex flex-col gap-2'>
              <p className='text-lg font-semibold line-clamp-2 text-center'>CATEGORY</p>

              <Link
                to={`/search`}
                className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-sky-500 text-sky-500 hover:bg-sky-500 dark:text-sky-200 dark:hover:text-slate-900 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
              >
                EXPLORE
              </Link>
            </div>
          </div>
          {/*Category Card 4 */}
          <div className='dark:bg-black dark:bg-opacity-20 group relative w-full border border-sky-700 hover:border-2 h-[320px] overflow-hidden sm:w-[430px] transition-all duration-300 drop-shadow-md'>
            <Link to={`/search`}>
              <img
                src=''
                alt='category'
                className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
              />
            </Link>
            <div className='p-3 flex flex-col gap-2'>
              <p className='text-lg font-semibold line-clamp-2 text-center'>CATEGORY</p>

              <Link
                to={`/search`}
                className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-sky-500 text-sky-500 hover:bg-sky-500 dark:text-sky-200 dark:hover:text-slate-900 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
              >
                EXPLORE
              </Link>
            </div>
          </div>
          {/*Category Card 5 */}
          <div className='dark:bg-black dark:bg-opacity-20 group relative w-full border border-sky-700 hover:border-2 h-[320px] overflow-hidden sm:w-[430px] transition-all duration-300 drop-shadow-md'>
            <Link to={`/search`}>
              <img
                src=''
                alt='category'
                className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
              />
            </Link>
            <div className='p-3 flex flex-col gap-2'>
              <p className='text-lg font-semibold line-clamp-2 text-center'>CATEGORY</p>

              <Link
                to={`/search`}
                className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-sky-500 text-sky-500 hover:bg-sky-500 dark:text-sky-200 dark:hover:text-slate-900 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
              >
                EXPLORE
              </Link>
            </div>
          </div>
          {/*Category Card 6 */}

        </div>

      </div>

    </div>
  )
}