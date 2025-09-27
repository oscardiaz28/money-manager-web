import React, { useCallback, useEffect, useState } from 'react'
import { Dashboard } from '../components/Dashboard'
import { Loader2, Plus } from 'lucide-react'
import { CategoryList } from '../components/CategoryList'
import { useCategoryStore } from '../store/useCategoryStore'
import { Modal } from '../components/Modal'
import { CategoryModal } from '../components/CategoryModal'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addCategory, deleteCategory, fetchCategories, updateCategory } from '../services/category.service'

export const Category = () => {

  const [openModal, setOpenModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const queryClient = useQueryClient()

  const [modalToDelete, setModalToDelete] = useState(false)
  const [idToDelete, setIdtoDelete] = useState(null)

  const handleCreate = () => {
    setSelectedCategory(null)
    setOpenModal(true)
  }

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  })

  const handleEdit = useCallback((category) => {
    setSelectedCategory(category)
    setOpenModal(true)
  }, [])

  const handleDelete = useCallback((id) => {
    setIdtoDelete(id)
    setModalToDelete(true)
  }, [])

  const handleSave = async (data) => {
    if (!selectedCategory) {
      createMutation.mutate(data)
    } else {
      updateMutation.mutate({id: selectedCategory.id, data})
    }
  }

  const createMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["categories"]})
      toast.success("Categoria creada correctamente")      
    },
    onError: (err) => {
      const message = err.response?.data?.message || "No se ha podido realizar la operación"
      toast.error(message)
    },
    onSettled: () => {
      setSelectedCategory(null)
      setOpenModal(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: async ( {id, data} ) => {
        await updateCategory(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["categories"]})
      toast.success("Categoria actualizada correctamente")      
    },
    onError: (err) => {
      const message = err.response?.data?.message || "No se ha podido realizar la operación"
      toast.error(message)
    },
    onSettled: () => {
      setSelectedCategory(null)
      setOpenModal(false)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["categories"]})
      toast.success("Categoria eliminada correctamente")
    },
    onError: (err) => {
      const message = err.response?.data?.message || "No se ha podido realizar la operación"
      toast.error(message)
    },
    onSettled: () => {
      setIdtoDelete(null)
      setModalToDelete(false)
    }
  })

  return (
    <Dashboard>
      <div className='my-5 mx-auto'>

        <div className='flex justify-between items-center mb-5 flex-wrap gap-3'>
          <h2 className='text-lg md:text-2xl font-semibold'>
            Categorias
          </h2>
          <button
            onClick={handleCreate}
            className='flex items-center gap-1 add-btn'>
            <Plus size={15} />
            <p>Agregar Categoria</p>
          </button>
        </div>

        { isLoading ? (
          <Loader2 className='animate-spin ' />
        ) : (
          <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <CategoryModal
          open={openModal}
          setOpen={setOpenModal}
          category={selectedCategory}
          onSave={handleSave}
          isAdding={createMutation.isPending}
          isEditing={updateMutation.isPending}
        />

        <Modal open={modalToDelete} setOpen={setModalToDelete} >
          <h2 className='font-medium text-lg'>Eliminar Categoria</h2>
          <p className='text-slate-700 mt-8'>¿Estas seguro de querer eliminar esta categoria?</p>

          <div className='flex items-center gap-2 justify-end flex-wrap mt-14'>
            <button
              className='py-1 px-3 rounded-[6px] border-1 border-gray-100 shadow-sm cursor-pointer'
              onClick={() => setModalToDelete(false)}
              type='button'>Cancelar</button>

            <button
              onClick={ () => deleteMutation.mutate(idToDelete) }
              className='flex items-center gap-1 bg-purple-800 text-white shadow-sm py-1 px-3 rounded-[6px] cursor-pointer'
              type='button'>
              { deleteMutation.isPending && <Loader2 className='animate-spin' size={15} />}
              <p>{ deleteMutation.isPending ? "Eliminando" : "Eliminar"}</p>
            </button>
          </div>
        </Modal>

      </div>
    </Dashboard>
  )
}
