import React, { useCallback, useEffect, useState } from 'react'
import { Dashboard } from '../components/Dashboard'
import { Loader2, Plus } from 'lucide-react'
import { IncomeModal } from '../components/IncomeModal'
import { useIncomeStore } from '../store/useIncomeStore'
import { IncomeList } from '../components/IncomeList'
import toast from 'react-hot-toast'
import { Modal } from '../components/Modal'
import { IncomeOverview } from '../components/IncomeOverview'

export const Income = () => {

  const { incomes, fetchIncomes, isFetchIncomes, addIncome, isDeleting, deleteIncome,
    getChartData, chartData, isGettingChartData } = useIncomeStore()
  const [openModal, setOpenModal] = useState(false)
  const [selectedIncome, setSelectedIncome] = useState(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [incomeToDelete, setIncomeToDelete] = useState(null)

  const handleCreate = () => {
    setSelectedIncome(null)
    setOpenModal(true)
  }

  const handleEdit = useCallback((income) => {
    setSelectedIncome(income)
    setOpenModal(true)
  }, [])

  const confirmDelete = async () => {
    if (!incomeToDelete) return
    try {
      await deleteIncome(incomeToDelete)
      toast.success("Ingreso eliminado correctamente")
    } catch (err) {
      const message = err.response?.data?.message || "No se ha podido eliminar el registro"
      toast.error(message)
    } finally {
      setIncomeToDelete(null)
      setShowDeleteModal(false)
    }
  }

  const handleDelete = (id) => {
    setShowDeleteModal(true)
    setIncomeToDelete(id)
  }

  const handleSave = async (data) => {
    const today = new Date().toISOString().split("T")[0];
    if (data.date > today) {
      toast.error("La fecha no puede ser en el futuro")
      return
    }
    try {
      if (!selectedIncome) {
        await addIncome(data)
        toast.success("Ingreso registrado correctamente")
      } else {
        // update
      }
    } catch (err) {
      const message = err.response?.data?.message || "No se ha podido realizar la operación"
      toast.error(message)
    } finally {
      setSelectedIncome(null)
      setOpenModal(false)
    }
  }

  useEffect(() => {
    Promise.all([
      fetchIncomes(),
      getChartData()
    ])
  }, [])

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
                <p>Agregar Ingreso</p>
              </button>
            </div>

            <div className='p-4 mt-5'>
              <IncomeOverview chartData={chartData} />
            </div>

          </div>

          {isFetchIncomes ? (
            <Loader2 className='animate-spin ' />
          ) : (
            <IncomeList incomes={incomes} onDelete={handleDelete} />
          )}

        </div>

        <IncomeModal
          open={openModal}
          setOpen={setOpenModal}
          income={selectedIncome}
          onSave={handleSave}
        />

        <Modal open={showDeleteModal} setOpen={setShowDeleteModal}>
          <h2 className='font-medium text-lg'>Eliminar Ingreso</h2>
          <p className='text-slate-700 mt-8'>¿Estas seguro de querer eliminar este ingreso?</p>

          <div className='flex items-center gap-2 justify-end flex-wrap mt-14'>
            <button
              className='py-1 px-3 rounded-[6px] border-1 border-gray-100 shadow-sm cursor-pointer'
              onClick={() => setShowDeleteModal(false)}
              type='button'>Cancelar</button>

            <button
              onClick={confirmDelete}
              className='flex items-center gap-1 bg-purple-800 text-white shadow-sm py-1 px-3 rounded-[6px] cursor-pointer'
              type='button'>
              {isDeleting && <Loader2 className='animate-spin' size={15} />}
              <p>{isDeleting ? "Eliminando" : "Eliminar"}</p>
            </button>
          </div>
        </Modal>

      </div>
    </Dashboard>
  )
}
