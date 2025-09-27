import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { Input } from './Input'
import { useForm } from 'react-hook-form'
import { useCategoryStore } from '../store/useCategoryStore'
import { Loader2, X } from 'lucide-react'
import { EmojiPickerPopup } from './EmojiPickerPopup'
import { ButtonSubmitForm } from './shared/ButtonSubmitForm'

export const CategoryModal = ({ open, setOpen, category, onSave, isAdding, isEditing }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [icon, setIcon] = useState("")

    const onSubmit = (data) => {
        const body = {
            name: data.name, type: data.type
        }
        if(icon || category ){
             body.icon = icon
        }
        onSave(body)
    }

    useEffect(() => {
        if (open) {
            if (category) {
                reset({ name: category.name, type: category.type })
                setIcon(category.icon)
            } else {
                reset({ name: "", type: "" })
                setIcon("")
            }
        }
    }, [category, open, reset])

    return (
        <Modal open={open} setOpen={setOpen} >

            <h2 className='mb-10'>{ category ? "Editar" : "Agregar"} Categoria</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='' >

                <EmojiPickerPopup icon={icon} onSelect={setIcon} />
                
                <Input
                    label={"Nombre"}
                    placeholder={"Ej. Freelance, Salario, Educación"}
                    register={register('name', { required: "El nombre es requerido" })}
                    errors={errors.name}
                    type={"text"}
                />

                <div className='pt-1'>
                    <p className='text-slate-800 block mb-1 text-[14px]'>Tipo de Categoria</p>
                    <select
                        {...register('type', {required: "El campo es requerido"})}
                        id="" className='w-full py-2 px-3 border border-gray-300 rounded-sm focus:outline-0 focus:border-1 focus:border-blue-500 focus:shadow-md text-slate-700'>
                        <option value="income">Ingreso</option>
                        <option value="expense">Gasto</option>
                    </select>
                    { errors.type && <span className='text-sm text-rose-500'>{errors.type.message}</span> }
                </div>

                <div className='flex items-center justify-end mt-6'>
                    <ButtonSubmitForm 
                        isAdding={isAdding}
                        isEditing={isEditing}
                        state={category}
                    />
                </div>

            </form>

        </Modal>
    )

}
