import { Wallet } from 'lucide-react'
import React from 'react'

export const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className='flex gap-6 bg-white shadow-md p-6 px-6 rounded-lg border border-gray-200/50'>
            <div className={`size-14 text-white flex items-center justify-center rounded-full drop-shadow-xl ${color}` }>
                {icon}
            </div> 
            <div className='flex flex-col gap-1'>
                <p className='text-gray-500 text-sm'>{label}</p>
                <p className='font-medium text-2xl'>S/ {value}</p>
            </div>
        </div>
    )
}
