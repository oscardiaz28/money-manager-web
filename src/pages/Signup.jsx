import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { useProfileStore } from '../store/useProfileStore';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProfilePhotoSelector } from '../components/ProfilePhotoSelector';
import { uploadProfileImage } from '../utils/uploadProfile';

export const Signup = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: ""
    }
  });
  const [profilePhoto, setProfilePhoto] = useState(null)

  const { signup, isCreatingAccount } = useProfileStore();

  const onSubmit = async (data) => {
    let profileImageUrl = ""
    try {
      if (profilePhoto) {
        profileImageUrl = await uploadProfileImage(profilePhoto)
      }
      await signup({ fullName: data.fullName, email: data.email, password: data.password, profileImageUrl })
      toast.success("Cuenta creada exitosamente")
      navigate("/login")
    } catch (err) {
      console.log(err)
      const message = err.response?.data?.message || "Ha ocurrido un error intentar mas tarde"
      toast.error(message)
    }
  }

  const navigate = useNavigate();

  return (
      <div className='h-screen w-full flex items-center justify-center overflow-hidden shadow-inner shadow-gray-300 relative'>
        <img src="/images/bg-img.jpg" alt="" className='absolute inset-0 w-full h-full object-cover filter blur-sm' />

        <div className='relative z-10 w-full max-w-lg px-6'>
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl py-7 p-8 overflow-y-auto ">

            <Link to="/" className='flex items-center justify-start mb-6 gap-2'>
              <img src={"/images/logo.png"} alt="" className='size-7' />
              <p className='text-sm font-medium text-block truncate'>Money Manager</p>
            </Link>

            <h3 className='text-2xl font-semibold text-center text-black mb-2'>Crea una cuenta</h3>
            <p className='text-sm text-slate-700 text-center mb-4'>
              Comience a realizar un seguimiento de sus gastos
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>

              <div className='flex justify-center'>
                <ProfilePhotoSelector
                  image={profilePhoto} setImage={setProfilePhoto}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
                <Input
                  register={register('fullName', { required: "El campo es requerido" })}
                  errors={errors.fullName}
                  label={"Nombre"}
                  placeholder={"Ej: John Doe"}
                  type={"text"}
                />
                <Input
                  register={register('email', { required: "El email es requerido" })}
                  errors={errors.email}
                  label={"Email"}
                  placeholder={"Ej: john@gmail.com"}
                  type={"email"}
                />
              </div>

              <div className='mb-5'>
                <Input
                  register={register('password', { required: "El password es requerido" })}
                  errors={errors.password}
                  label={"Password"}
                  placeholder={"******"}
                  type={"password"}
                />
              </div>

              <button
                disabled={isCreatingAccount}
                className={`bg-purple-950 w-full text-white rounded-sm p-2 px-3 font-medium shadow-2xl flex items-center justify-center gap-2  ${!isCreatingAccount ? "hover:bg-purple-700 cursor-pointer " : "opacity-80 cursor-not-allowed"}`}>
                {isCreatingAccount ? (<>
                  <Loader2 className='animate-spin size-5' />
                  Registrando
                </>) : "Registrar"}
              </button>

              <div className='flex items-center justify-center gap-1 text-sm mt-3'>
                <p>¿Ya tienes una cuenta? </p>
                <Link to={"/login"} className='hover:underline text-blue-800 font-medium'>Inicia Sesión</Link>
              </div>

            </form>

          </div>
        </div>

      </div>
  )

}
