import React from 'react'
import { Menubar } from './Menubar'
import { useProfileStore } from '../store/useProfileStore'
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const Dashboard = ( {children} ) => {

    const { user } = useProfileStore();

  return (
    <div>
        <Menubar />
        
        <div className='flex'>
            <div className='max-[1080px]:hidden'>
                <Sidebar />
            </div>
            <div className='grow mx-5'>
                {children}
            </div>
        </div>
    </div>
  )
}
