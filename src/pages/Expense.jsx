import React, { useState } from 'react'
import { Dashboard } from '../components/Dashboard'
import { Loader2, Plus } from 'lucide-react'
import { ExpenseModal } from '../components/ExpenseModal'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addExpense, deleteExpense, getChartData, getExpenses } from '../services/expense.service'
import { ExpenseList } from '../components/ExpenseList'
import { Modal } from '../components/Modal'
import { ExpenseOverview } from '../components/ExpenseOverview'

export const Expense = () => {

  const queryClient = useQueryClient()
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const [expenseToDelete, setExpenseToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleCreate = () => {
    setSelectedExpense(null)
    setOpenModal(true)
  }

  const handleSave = (data) => {
    const today = new Date().toISOString().split("T")[0]
    if (data.date > today) {
      toast.error("La fecha no puede ser en el futuro")
      return
    }
    if (!selectedExpense) {
      createExpense.mutate(data)
    } else {
      // actualizar
    }
  }

  const handleDelete = (id) => {
    setExpenseToDelete(id)
    setShowDeleteModal(true)
  }

  const { data: expenses = [], isLoading, error, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses
  })

  const { data: chartData = [], isLoading: getChart } = useQuery({
    queryKey: ["chart"],
    queryFn: getChartData
  })

  const createExpense = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
      queryClient.invalidateQueries({ queryKey: ["chart"] })

      toast.success("Gasto registrado correctamente")
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Ha ocurrido un error"
      toast.error(message)
    },
    onSettled: () => {
      setSelectedExpense(null)
      setOpenModal(false)
    }
  })

  const confirmDelete = () => {
    if(!expenseToDelete) return;
    deleteMutation.mutate(expenseToDelete)
  }

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["expenses"] })
      queryClient.invalidateQueries({ queryKey: ["chart"] })

      toast.success("Gasto eliminado correctamente")
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Ha ocurrido un error"
      toast.error(message)
    },
    onSettled: () => {
      setExpenseToDelete(null)
      setShowDeleteModal(false)
    }
  })

  return (
    <Dashboard>
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 gap-6'>
          <div className='bg-white rounded-lg p-4 px-5 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div>

              </div>
              <button
                onClick={handleCreate}
                className='add-btn flex items-center gap-1'>
                <Plus size={17} />
                <p>Agregar Gasto</p>
              </button>
            </div>

            <div className='p-4 mt-5'>
              <ExpenseOverview chartData={chartData} />
            </div>

          </div>

          { isLoading ? (
            <Loader2 className='animate-spin ' />
          ) : (
            <ExpenseList expenses={expenses} onDelete={handleDelete} />
          )}

        </div>

        <ExpenseModal
          open={openModal}
          setOpen={setOpenModal}
          expense={selectedExpense}
          onSave={handleSave}
          isAdding={createExpense.isPending}
        />

        <Modal open={showDeleteModal} setOpen={setShowDeleteModal}>

          <h2 className='font-medium text-lg'>Eliminar Gasto</h2>
          <p className='text-slate-700 mt-8'>¿Estas seguro de querer eliminar este gasto?</p>

          <div className='flex items-center gap-2 justify-end flex-wrap mt-14'>
            <button
              className='py-1 px-3 rounded-[6px] border-1 border-gray-100 shadow-sm cursor-pointer'
              onClick={() => setShowDeleteModal(false)}
              type='button'>Cancelar</button>

            <button
              onClick={ confirmDelete }
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
