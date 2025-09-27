import { div, img } from 'framer-motion/client'
import { ArrowRight, Layers2, Loader2, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx'
dayjs.locale("es-mx")

export const RecentTransactions = ({ label, path, transactions, isLoading }) => {

    const navigate = useNavigate();

    return (
        <div className='bg-white shadow-md p-6 rounded-lg border border-gray-200/50'>
            
            <div className='flex items-center justify-between'>
                <h4 className='text-md font-medium'>{label}</h4>
                <button
                    onClick={() => navigate(path)}
                    className='flex items-center bg-gray-100 gap-2 rounded-md p-2 px-3 text-sm cursor-pointer border-1 border-gray-200/50'>
                    <p className=''>Ver más</p>
                    <ArrowRight size={15} className='mt-[.5px]' />
                </button>
            </div>

            <div className='grid grid-cols-1 gap-4 mt-6 h-[350px] overflow-y-auto'>

                { isLoading && (
                    <div className='flex items-center justify-center'>
                        <Loader2 size={15} className='animate-spin' />
                    </div>
                ) }

                { !isLoading && transactions.length == 0 && <p className='flex items-center justify-center text-gray-600 text-sm'>Aun no has agregado registros</p> }

                { !isLoading && transactions && transactions.map( t => (
                    <div key={t.id} className='hover:bg-gray-50 rounded-lg p-4 flex items-center gap-4'>

                        <div className='size-16 flex items-center justify-center rounded-full bg-gray-100'>
                            {t.icon ? (
                                <img src={t.icon} className='size-8' />
                            ) : (
                                <Layers2 className='text-purple-800' size={24} />
                            )}
                        </div>

                        <div className='flex flex-1 items-center justify-between'>

                            <div className=''>
                                <p>{t.name}</p>
                                <p>
                                    {dayjs(t.date).format('MMM d, YYYY')}
                                </p>
                            </div>

                            <div className={`flex items-center gap-2 py-1 px-3 font-semibold text-sm border-1 rounded-sm ${t.type == "income" ? "bg-emerald-50 text-emerald-800 border-emerald-100" : "bg-rose-50 text-rose-800 border-rose-100"}`}>
                                <p>S/ {t.amount}</p>
                                {t.type == "income" ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                            </div>

                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}
