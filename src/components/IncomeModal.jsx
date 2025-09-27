import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import { useForm } from 'react-hook-form'
import { EmojiPickerPopup } from './EmojiPickerPopup'
import { Input } from './Input'
import { ButtonSubmitForm } from './shared/ButtonSubmitForm'
import { useCategoryStore } from '../store/useCategoryStore'
import { Loader2 } from 'lucide-react'
import { useIncomeStore } from '../store/useIncomeStore'

export const IncomeModal = ({ open, setOpen, income, onSave }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [icon, setIcon] = useState("")
  const { fetchIncomeCategories } = useCategoryStore()
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  const { isAdding } = useIncomeStore()

  const onSubmit = (data) => {
    const body = {
      amount: parseFloat(data.amount),
      categoryId: parseInt(data.categoryId),
      date: data.date,
      name: data.name
    }
    if( icon || income ){
      body.icon = icon
    }
    onSave(body)
  }

  useEffect(() => {
    if (open) {
      if (income) {
      } else {
        reset({
          date: new Date().toISOString().split("T")[0],
          name: "",
          amount: "",
          categoryId: ""
         })
         setIcon("")
      }
    }
  }, [income, open, reset])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchIncomeCategories()
        setCategories(data)
      } catch (err) {
        setCategories([])
        console.log(err)
      } finally {
        setLoadingCategories(false)
      }
    }
    getCategories()
  }, [])

  return (

    <Modal open={open} setOpen={setOpen} >
      <h2 className='mb-10'>{income ? "Editar" : "Agregar"} Ingreso</h2>

      <form action="" onSubmit={handleSubmit(onSubmit)}>

        <EmojiPickerPopup icon={icon} onSelect={setIcon} />

        <Input
          label={"Nombre"}
          type={"text"}
          placeholder={"Ej: Salario, Freelance, Bonus"}
          register={register('name', { required: "El campo es requerido" })}
          errors={errors.name}
        />

        <div className='mb-4'>
          <label htmlFor="" className='block text-slate-800 mb-1 text-[14px]'>Categoria</label>
          {loadingCategories ? (
            <div><Loader2 className='animate-spin' size={15} /></div>
          ) : (
            <select
              {...register('categoryId', {required: "Seleccione una categoria"})}
              className='w-full py-2 px-3 border border-gray-300 rounded-sm focus:outline-0 focus:border-1 focus:border-blue-500 focus:shadow-md text-slate-700'
               >
              {categories.map( c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}  
            </select>
          )}
          {errors.categoryId && <span className='text-sm text-rose-500'>{errors.categoryId.message}</span>}
        </div>

        <Input
          label={"Cantidad"}
          type={"number"}
          register={register('amount', { required: "El campo es requerido" })}
          errors={errors.amount}
        />

        <Input
          label={"Fecha"}
          type={"date"}
          register={register('date')}
          errors={errors.amount}
        />

        <div className='flex items-center justify-end'>
          <ButtonSubmitForm isAdding={isAdding} isEditing={false} state={income} />
        </div>

      </form>

    </Modal>

  )
}
