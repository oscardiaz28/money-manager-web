import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useProfileStore } from '../store/useProfileStore'

export const Activate = () => {

    const [loading, setLoading] = useState(true)
    const [alerta, setAlerta] = useState({ message: "", type: "" })
    const { activateAccount } = useProfileStore();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || ""

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                await activateAccount(token)
                setAlerta({
                    message: "Cuenta confirmada",
                    type: "success"
                })
            } catch (err) {
                setAlerta({
                    message: "El token no es valido",
                    type: "error"
                })
            } finally {
                setLoading(false)
            }
        }
        confirmAccount();
    }, [])

    return (
        <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
            <img src="/images/bg-img.jpg" alt="" className='absolute inset-0 w-full h-full object-cover filter blur-sm' />

            <div className='relative z-10 w-full max-w-lg px-6'>

                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 overflow-y-auto ">
                    <p className='text-lg text-slate-700 text-center mb-4'>
                        Confirma tu cuenta y empieza a administrar tu gastos
                    </p>

                    <div className=''>
                        {loading && (
                            <div className='flex items-center gap-2 justify-center pt-8'>
                                <Loader2 className='animate-spin' />
                                <p>Verificando cuenta, espere</p>
                            </div>
                        )}
                        {loading == false && (
                            <>
                                <Alerta alerta={alerta} />
                                <div className='mt-8 lg:flex lg:items-center lg:justify-between'>
                                    <Link to="/login" className='bg-purple-950 w-fit text-white py-2 px-5 rounded-[4px] block text-center my-5 md:my-0'>Inicia Sesión</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}

const Alerta = ({ alerta }) => {
    if (!alerta.message) return null

    return (
        <div className={`p-2 my-4 text-center rounded ${alerta.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            <p>{alerta.message}</p>
        </div>
    )
}