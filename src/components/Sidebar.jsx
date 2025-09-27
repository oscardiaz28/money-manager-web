import React from 'react'
import { useProfileStore } from '../store/useProfileStore'
import { User } from 'lucide-react';
import { sidebarLinks } from '../utils/constants';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {

    const { user } = useProfileStore();
    const location = useLocation();

    return (
        <div className='w-64 h-[calc(100vh-75px)] bg-white border-gray-200/50 p-5 sticky top-[75px] z-20 shadow-lg'>

            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                {user?.profileImageUrl ? (
                    <img src={user?.profileImageUrl}
                        className='size-20 rounded-full object-cover shadow-lg bg-slate-400 '
                        alt="" />
                ) : (
                    <div className='flex items-center justify-center size-20 rounded-full bg-gray-100'>
                        <User className='text-purple-600 size-7' />
                    </div>
                )}
                <h5 className='text-gray-700 font-medium leading-6'>{user?.fullName}</h5>
            </div>

            {sidebarLinks.map((item, idx) => {
                const isActive = location.pathname == item.path
                return (
                    <Link
                        to={item.path}
                        key={idx} className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3
                        ${isActive && "text-white bg-purple-800 shadow-lg" } `}>
                        <item.icon className='text-xl' />
                        {item.label}
                    </Link>
                )
            })}

        </div>
    )
}
