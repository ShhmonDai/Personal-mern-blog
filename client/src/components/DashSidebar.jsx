import { Sidebar } from 'flowbite-react';
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';

const customTheme = {
    sidebar: { "root": {
        "base": "h-full",
        "collapsed": {
            "on": "w-16",
            "off": "w-64"
        },
        "inner": "h-full overflow-y-auto overflow-x-hidden border-r-2 bg-[rgba(0,0,0,0.1)] dark:border-gray-700 py-4 px-3 backdrop-blur dark:bg-[rgba(0,0,0,0.1)] transition-colors duration-500"
    },
    }
};


export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Sidebar className='w-full md:w-56'>
        <Sidebar.Items className=''>
            <Sidebar.ItemGroup>
                
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>

                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item> 

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    </Flowbite>
  );
}