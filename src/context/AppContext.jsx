import React, { createContext, useEffect, useState } from 'react'
import { axiosConfig } from '../utils/axios';
import { useProfileStore } from '../store/useProfileStore';
import { Loader2 } from 'lucide-react';
import { CustomLoader } from '../components/CustomLoader';

export const AppContext = createContext();

export const AppContextProvider = ( {children} ) => {

    const { isFetching, checkAuth, user } = useProfileStore();

    useEffect(() => {
        checkAuth()
    }, [checkAuth])


    if( isFetching && !user ){
        return (
            <div className='border-1 border-muted h-screen w-full flex flex-col items-center justify-center bg-white'>
                <div className='flex items-center gap-1'>
                    <img src="/images/logo.png" className='size-10' alt="" />
                    <p>Money Manager</p>
                </div>
                <div className='mt-7 relative'>
                    <CustomLoader />
                </div>
            </div>
        )
    }
    const contextValues = {
        user
    }
    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    )

}
