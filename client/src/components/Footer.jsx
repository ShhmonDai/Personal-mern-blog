import { Footer } from "flowbite-react";
import { BsLinkedin, BsInstagram, BsDribbble, BsGithub, BsLaptop } from 'react-icons/bs';
import { Link } from "react-router-dom";

export default function FooterCom() {
  return (
      <Footer container className='border-t-2 dark:border-gray-700 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(0,0,0,0.4)] transition-colors duration-500'>
    <div className='w-full max-w-7xl mx-auto'>

        <div className='grid-cols-2 w-full justify-between flex flex-wrap'>


            <div className='items-center justify-center hidden sm:flex'>
                <Link to='/' className='text-3xl font-BrushFont'>Szymons</Link>    
            </div>

            <div className='mt-3'>
                <Footer.Title title='About' />
                <Footer.LinkGroup col>
                    <Footer.Link as={Link} to='/about'> 
                        This Project
                    </Footer.Link>
                          <Footer.Link href='https://github.com/ShhmonDai/mern-blog' target='_blank' rel='noopener noreferrer'>
                        Source Code
                    </Footer.Link>
                </Footer.LinkGroup>
            </div>

            <div className='mt-3'>
                <Footer.Title title='Follow Me' />
                <Footer.LinkGroup col>
                    <Footer.Link href='https://www.shhmon.com' target='_blank' rel='noopener noreferrer'>
                        Shhmon.com
                    </Footer.Link>
                    <Footer.Link href='https://github.com/ShhmonDai' target='_blank' rel='noopener noreferrer'>
                        Github
                    </Footer.Link>
                </Footer.LinkGroup>
            </div>

            <div className='mt-3'>
                <Footer.Title title='Coming Soon' />
                <Footer.LinkGroup col>
                    <Footer.Link disabled target='_blank' rel='noopener noreferrer' className='line-through text-gray-400'>
                        Bloom
                    </Footer.Link>
                          <Footer.Link disabled target='_blank' rel='noopener noreferrer' className='line-through text-gray-400'>
                        Public Blog
                    </Footer.Link>
                </Footer.LinkGroup>
            </div>
        </div>

        <Footer.Divider />

        <div className='grid w-full sm:flex justify-center sm:justify-around'>
                <Footer.Copyright href='#' by="Szymon's blog" year={new Date().getFullYear()}/>
            <div className='flex gap-6 mt-4 sm:mt-0'>
                <Footer.Icon href='https://www.linkedin.com/in/shhmon/' target='_blank' rel='noopener noreferrer' icon={BsLinkedin} />
                <Footer.Icon href='https://github.com/ShhmonDai' target='_blank' rel='noopener noreferrer' icon={BsGithub} />
                <Footer.Icon href='https://www.shhmon.com' target='_blank' rel='noopener noreferrer' icon={BsLaptop} />
                <Footer.Icon href='https://instagram.com/shh.mon' target='_blank' rel='noopener noreferrer' icon={BsInstagram} />
            </div>
        </div>

    
    </div>                  
</Footer>
  )
}