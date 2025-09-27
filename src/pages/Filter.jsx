import React, { useEffect, useState } from 'react'
import { Dashboard } from '../components/Dashboard'
import { Layers2, Loader2, Search, TrendingDown, TrendingUp } from 'lucide-react'
import { useFilterStore } from '../store/useFilterStore'
import toast from 'react-hot-toast'
import { endDay, firstDay } from '../utils/util'
import dayjs from "dayjs";
import 'dayjs/locale/es-mx'
dayjs.locale("es-mx")


export const Filter = () => {

  const [filters, setFilters] = useState({
    type: "income",
    startDate: firstDay(),
    endDate: endDay(),
    keyword: "",
    sortField: "date",
    sortOrder: "desc"
  })

  const handleChange = (e) => {
    const input = e.target
    const { name, value } = input
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const [transactions, setTransactions] = useState([])

  const { loading, getTransactions, type } = useFilterStore()

  const handleFetch = async () => {
    try {
      const data = await getTransactions(filters, filters.type)
      setTransactions(data)
    } catch (err) {
      const message = err.response?.data?.message || "Ha ocurrido un error"
      toast.error(message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetch();
  }

  return (
    <Dashboard>
      <div className='my-5 mx-auto'>

        <div className='flex items-center justify-between mb-5 flex-wrap gap-3'>
          <h2 className='font-semibold text-lg md:text-2xl'>Filtrar Transacciones</h2>
        </div>

        <div className='bg-white p-4 rounded-lg shadow-lg mb-5'>
          <div className='mb-4'>
            <h5 className='text-lg font-semibold'>Selecciona los filtros</h5>
          </div>

          <form >
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4'>

              <div>
                <label htmlFor="type" className='block text-sm font-medium mb-1'>Tipo</label>
                <select name="type" id="type" className='form-input'
                  value={filters.type} onChange={handleChange} >
                  <option value="income">Ingresos</option>
                  <option value="expense">Gastos</option>
                </select>
              </div>

              <div>
                <label htmlFor="startDate" className='block text-sm font-medium mb-1'>Fecha de Inicio</label>
                <input name='startDate' type="date" id='startDate' value={filters.startDate} onChange={handleChange} className='form-input' />
              </div>

              <div>
                <label htmlFor="endDate" className='block text-sm font-medium mb-1'>Fecha Fin</label>
                <input name='endDate' type="date" id='endDate' className='form-input'
                  value={filters.endDate}
                  onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="sortField" className='block text-sm font-medium mb-1'>Campo de Orden</label>
                <select name="sortField" value={filters.sortField} onChange={handleChange} id="sortField" className='form-input'>
                  <option value="date">Fecha</option>
                  <option value="amount">Monto</option>
                </select>
              </div>

              <div>
                <label htmlFor="sortOrder" className='block text-sm font-medium mb-1'>Ordenar Por</label>
                <select name="sortOrder" id="sortOrder" value={filters.sortOrder} onChange={handleChange} className='form-input'>
                  <option value="asc">Ascedente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>

              <div className='sm:col-span-1 md:col-span-1 flex items-end gap-1'>
                <div className='w-full'>
                  <label htmlFor="keyword" className='block text-sm font-medium'>Buscar</label>
                  <input name='keyword' type="text" id='keyword' value={filters.keyword} onChange={handleChange} className='form-input' />
                </div>

                <button
                  disabled={loading}
                  type='submit'
                  onClick={handleSubmit}
                  className='bg-purple-800 text-white rounded-sm p-2 mb-1 cursor-pointer'>
                  { loading ? <Loader2 size={15} className='animate-spin' /> : <Search size={15} className='' /> }
                </button>

              </div>

            </div>

          </form>

        </div>

        <div className='bg-white p-4 rounded-lg shadow-lg mb-5'>

          <div className='flex items-center justify-between mb-4'>
            <h2 className='font-semibold text-lg'>Transacciones</h2>
          </div>

          <div className='grid grid-cols-1 gap-3 px-5'>
            {
              transactions.map(item => (
                <div key={item.id} className='hover:bg-gray-50 rounded-lg p-4 flex items-center gap-4'>

                  {/* icon emoji */}
                  <div className='size-16 flex items-center justify-center rounded-full bg-gray-100'>
                    {item.icon ? (
                      <img src={item.icon} className='size-8' alt="" />
                    ) : (
                      <Layers2 className='text-purple-800' size={24} />
                    )}
                  </div>

                  <div className='flex-1 flex items-center justify-between'>

                    <div className='space-y-1'>
                      <p className='font-medium text-md text-gray-700'>{item.name}</p>
                      <p className='font-medium text-sm text-gray-400'>
                        {dayjs().format('MMMM d, YYYY')}
                      </p>
                    </div>

                    <div className={`flex items-center gap-2 py-1 px-3 font-semibold text-sm border-1 rounded-sm ${type == "income" ? "bg-emerald-50 text-emerald-800 border-emerald-100" : "bg-rose-50 text-rose-800 border-rose-100"}`}>
                      <p>S/ {item.amount}</p>
                      {type == "income" ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                    </div>

                  </div>
                </div>
              ))
            }
          </div>

        </div>

      </div>
    </Dashboard>
  )
}
