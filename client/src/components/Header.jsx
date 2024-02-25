import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice";
import { Flowbite } from 'flowbite-react';

const customNavTheme = {
  navbar: {
    "root": {
      "base": "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
      "rounded": {
        "on": "rounded",
        "off": ""
    },
      "bordered": {
        "on": "border",
        "off": ""
    },
      "inner": {
        "base": "mx-auto flex flex-wrap items-center justify-between",
        "fluid": {
          "on": "",
          "off": "container"
      }
      }
    },
    "brand": {
      "base": "flex items-center"
  },
    "collapse": {
      "base": "w-full md:block md:w-auto",
      "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      "hidden": {
        "on": "hidden",
        "off": ""
    }
    },
    "link": {
      "base": "block py-2 pr-4 pl-3 md:p-0",
      "active": {
        "on": "bg-blue-400 dark:bg-blue-500 text-gray-900 dark:text-white md:text-blue-400 md:bg-transparent dark:md:bg-transparent md:dark:text-blue-400",
        "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
    },
      "disabled": {
        "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        "off": ""
    }
    },
    "toggle": {
      "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      "icon": "h-6 w-6 shrink-0"
  },
  
  }
};



export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector((state) => state.theme);

  return (
    <Flowbite theme={{ theme: customNavTheme }}>
    <Navbar className='border-b-2 sticky top-0 z-40 backdrop-blur transition-colors duration-500 bg-transparent dark:bg-transparent'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 rounded-lg text-white'>Szymons</span>
        Blog
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch} 
          className='hidden lg:inline'
        />
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=> dispatch(toggleTheme())}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded/>}>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick=''>Sign out</Dropdown.Item>
          </Dropdown>

        ): 
        (
          <Link to='/sign-in'>
            <Button gradientDuoTone='greenToBlue' outline pill>
              Sign In
            </Button>
          </Link>
        )
        
      }

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to='/'> Home </Link>
          </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
            <Link to='/about'> About </Link>
          </Navbar.Link> 
        <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to='/projects'> Projects </Link>
          </Navbar.Link>       
      </Navbar.Collapse>

    </Navbar>
    </Flowbite>
  )
}