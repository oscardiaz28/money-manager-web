import React from 'react'
import { useProfileStore } from '../store/useProfileStore'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const Landing = () => {

    return (
        <div className=''>

            <div className='flex items-center justify-between gap-5 bg-white border-b-1 border-gray-200/50 backdrop-blur-2xl py-4 px-4 sm:px-7 sticky top-0 left-0 z-30'>

                <div className='flex items-center gap-2'>
                    <img src={"/images/logo.png"} className='size-9' alt="" />
                    <p className='text-lg font-medium text-block truncate'>Money Manager</p>
                </div>

                <div className='flex items-center gap-4 text-sm'>
                    <Link to={"/login"} className='block text-gray-800'>Iniciar Sesión</Link>
                    <Link 
                    className='block bg-purple-800 text-white rounded-md py-2 px-3 font-medium'
                    to={"/signup"}>Empezar</Link>
                </div>

            </div>

            <div className='flex items-center flex-col text-center py-20 lg:py-24 px-4'>
                <h1 className='text-[#12151D] font-bold text-3xl sm:text-4xl lg:text-5xl mb-5'>Toma el control de tus finanzas</h1>
                <p className='text-gray-700 text-sm md:text-base max-w-xl mx-auto'>La forma más sencilla y segura de organizar tus finanzas. Registra ingresos y gastos y logra tus objetivos financieros.</p>

                <div className='flex items-center gap-4 text-sm md:text-base mt-8'>
                    <Link to={"/signup"} className='block bg-purple-800 text-white font-medium py-2 px-5 rounded-md'>Comienza el seguimiento gratis</Link>
                    <Link to={"/"} className='flex items-center gap-2 bg-[#F0F0F2] rounded-md py-2 px-4 '>
                        <p>Más información</p>
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>

            <div className='w-full max-w-[1080px] mx-auto pb-20 px-6 lg:px-5'>

                <img src="/images/example.png" alt="" className='border-1 border-gray-200/50 rounded-lg overflow-hidden shadow-sm' />

            </div>

        </div>
    )
}
