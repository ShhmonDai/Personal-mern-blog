export default function Home() {
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


    </div>
  )
}
