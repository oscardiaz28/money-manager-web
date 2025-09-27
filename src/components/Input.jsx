import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export const Input = ({ label, register, errors, placeholder, type }) => {

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='mb-4'>
            <label htmlFor="" className='text-slate-800 block mb-1 text-[14px]'>{label}</label>
            <div className='relative'>

                {type == "number" ? (
                    <>
                        <input
                            type="number"
                            step="0.01"
                            className={`w-full bg-transparent outline-none border-gray-300 rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-0 border-1 focus:border-1 focus:border-blue-500 focus:shadow-md ${type == "password" && "pr-10"}`}
                            {...register}
                        />
                    </>
                ) : (
                    <>
                        <input
                            type={type === "password" ? (showPassword ? "text" : "password") : type}
                            placeholder={placeholder}
                            className={`w-full bg-transparent outline-none border-gray-300 rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-0 border-1 focus:border-1 focus:border-blue-500 focus:shadow-md ${type == "password" && "pr-10"}`}
                            {...register}
                        />
                    </>
                )}

                {type === "password" && (
                    <span className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'>
                        {showPassword ? (
                            <Eye size={15} className='text-slate-500' onClick={toggleShowPassword} />
                        ) : (
                            <EyeOff size={15} className='text-slate-500' onClick={toggleShowPassword} />
                        )}
                    </span>
                )}

                {errors && <span className='text-sm text-rose-500'>{errors.message}</span>}
            </div>
        </div>
    )

}
