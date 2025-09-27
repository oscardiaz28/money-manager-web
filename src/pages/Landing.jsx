import React from 'react'
import { useProfileStore } from '../store/useProfileStore'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LandingLayout } from '../components/LandingLayout'

export const Landing = () => {
    return (
        <>
            <LandingLayout>
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
            </LandingLayout>
        </>
    )
}
