import React from 'react'
import { Link } from 'react-router-dom'

export const LandingLayout = ({ children }) => {
    return (
        <div className=''>

            <div className='flex items-center justify-between gap-5 bg-white border-b-1 border-gray-200/50  
             nav-shadow py-4 px-4 sm:px-7 sticky top-0 left-0 z-30'>

                <Link to={"/"} className='flex items-center gap-2'>
                    <img src={"/images/logo.png"} className='size-9' alt="" />
                    <p className='text-lg font-medium text-block truncate'>Money Manager</p>
                </Link>

                <div className='flex items-center gap-4 text-sm'>
                    <Link to={"/login"} className='block text-gray-800'>Iniciar Sesión</Link>
                    <Link
                        className='block bg-purple-800 text-white rounded-md py-2 px-3 font-medium'
                        to={"/signup"}>Empezar</Link>
                </div>
            </div>

            {children}

        </div>
    )
}
