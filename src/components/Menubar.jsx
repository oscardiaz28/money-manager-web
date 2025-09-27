import React, { useEffect, useRef, useState } from 'react'
import { useProfileStore } from '../store/useProfileStore'
import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, Sidebar, User, X } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

export const Menubar = () => {

    const queryClient = useQueryClient()
    const [openSideMenu, setOpenSideMenu] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    const { user, logout } = useProfileStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login")

        localStorage.clear();
        setShowDropdown(false)
        logout()
        queryClient.clear()
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const elem = event.target
            if( dropdownRef.current && !dropdownRef.current.contains(elem) ){
                setShowDropdown(false)
            }
        }
        if(showDropdown){
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showDropdown])

    return (
        <div className='flex items-center justify-between gap-5 bg-white border-b-1 border-gray-200/50 backdrop-blur-2xl py-4 px-4 sm:px-7 sticky top-0 left-0 z-30'>
            {/* Left side - menu button */}
            <div className='flex items-center gap-5'>
                <button 
                onClick={() => setOpenSideMenu(!openSideMenu)}
                className='block lg:hidden text-black hover:bg-gray-100 p-1 rounded-full transition-colors cursor-pointer'>
                    { openSideMenu ? (
                        <X className='text-2xl' />
                    ) : (
                        <Menu className='text-2xl' />
                    ) }
                </button>

                <div className='flex items-center gap-2'>
                    <img src={"/images/logo.png"} alt="" className='size-9' />
                    <p className='text-lg font-medium text-block truncate'>Money Manager</p>
                </div>
            </div>

            {/* right side - avatar */}
            <div className='relative' ref={dropdownRef}>
                <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center gap-3 cursor-pointer'>
                    <button 
                    className='flex items-center justify-center size-10 bg-gray-100 
                    rounded-full transition-colors duration-200 cursor-pointer shadow-lg'>
                        { user?.profileImageUrl ? (
                            <img src={user?.profileImageUrl} alt="" className='size-10 rounded-full object-cover' />
                        ) : (
                            <User className='text-purple-500' />
                        )}
                    </button>
                    <p className='text-gray-700 hidden lg:block'>{user?.fullName}</p>
                </div>
                { showDropdown && (
                    <div className='absolute bg-white mt-2 right-0 rounded-lg shadow-lg border border-gray-200 w-48 py-1 z-50'>
                        {/* user info */}
                        <div className='px-4 py-3 border-b border-gray-200'>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center justify-center size-8 bg-gray-100 rounded-full'>
                                    <User className='size-4 text-purple-600' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-medium text-gray-700 truncate'>{user?.fullName}</p>
                                    <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                                </div>
                            </div>
                        </div>
                        {/* drop options */}
                        <div className='py-1 px-1'>
                            <button 
                            onClick={handleLogout}
                            className='flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-[4px] cursor-pointer'>
                                <LogOut className='size-4 text-gray-500' />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                ) }
            </div>

            {/* mobile side menu */}
            { openSideMenu && (
                <div className='fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden shadow-lg z-20 top-[75px]'>
                    <Sidebar />
                </div>
            ) }

        </div>
    )

}
