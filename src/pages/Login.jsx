import React from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useProfileStore } from '../store/useProfileStore';
import { Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { activationMessage, resetActivationMessage, login, isSigningIn, setUser } = useProfileStore();
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      await login(data)
      navigate("/dashboard")
    } catch (err) {
      const message = err.response?.data?.message || "No se ha podido iniciar sesión"
      toast.error(message)
    }
  }

  return (
      <div className='h-screen w-full flex items-center justify-center overflow-hidden relative shadow-inner shadow-gray-300'>

        <img src="/images/bg-img.jpg" alt="" className='absolute inset-0 w-full h-full object-cover filter blur-sm' />

        <div className='relative z-10 w-full max-w-lg px-6'>

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 overflow-y-auto ">

            <Link to="/" className='flex items-center justify-start mb-6 gap-2'>
                <img src={"/images/logo.png"} alt="" className='size-7' />
                <p className='text-sm font-medium text-block truncate'>Money Manager</p>
            </Link>

            <h3 className='text-2xl font-semibold text-center text-black mb-2'>Bienvenido de nuevo</h3>
            <p className='text-sm text-slate-700 text-center mb-4'>
              Ingrese sus credenciales para inciar sesión
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>

              <div>
                <Input
                  register={register('email', { required: "El email es requerido" })}
                  errors={errors.email}
                  label={"Email"}
                  placeholder={"Ej: john@gmail.com"}
                  type={"email"}
                />
              </div>

              <div className='mb-6'>
                <Input
                  register={register('password', { required: "El password es requerido" })}
                  errors={errors.password}
                  label={"Password"}
                  placeholder={"******"}
                  type={"password"}
                />
              </div>

              <button className={`bg-purple-950 w-full text-white rounded-sm p-2 px-3  mt-3 font-medium shadow-2xl flex items-center justify-center gap-2  ${!isSigningIn ? "hover:bg-purple-700 cursor-pointer " : "opacity-80 cursor-not-allowed"}`}>
                {isSigningIn ? (
                  <div className='flex items-center justify-center gap-2'>
                    <Loader2 className='size-5 animate-spin' /> <p>Iniciando Sesión</p>
                  </div>
                ) : "Iniciar Sesión"}
              </button>

              <div className='flex items-center justify-center gap-1 text-sm mt-3'>
                <p>¿Aun no tienes una cuenta? </p>
                <Link to={"/signup"} className='hover:underline text-blue-800 font-medium'>Crear Cuenta</Link>
              </div>

            </form>

          </div>

        </div>

      </div>
  )

}
