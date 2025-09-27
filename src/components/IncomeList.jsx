import { Download, Layers2, Loader2, Mail, Trash2, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { useIncomeStore } from '../store/useIncomeStore'
import toast from 'react-hot-toast'

export const IncomeList = ({ incomes, onDelete }) => {

  const [downloading, setDowloading] = useState(false)
  const { downloadExcel } = useIncomeStore()

  const handleDownload = async () => {
    setDowloading(true)
    try {
      const file = await downloadExcel()
      const filename = "ingresos_detalles.xlsx"
      const url = window.URL.createObjectURL(new Blob([file]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success("Documento descargado exitosamente")
    } catch (err) {
      console.log(err)
    } finally {
      setDowloading(false)
    }
  }

  console.log(downloading)

  return (
    <div className='bg-white shadow-sm p-4 rounded-lg'>

      <div className='flex justify-between items-center mb-5 flex-wrap gap-3'>

        <h2 className='text-lg md:text-xl font-semibold'>
          Todos los Ingresos
        </h2>

        <div className='flex flex-wrap items-center justify-end gap-2'>

          {incomes.length > 0 && (
            <button
              onClick={handleDownload}
              className='bg-gray-200/40 border-1 border-gray-200 flex items-center gap-2 text-sm cursor-pointer py-1 px-3 rounded-[6px] text-slate-800 hover:bg-gray-200/80 transition-colors duration-200'>
              {downloading ? <Loader2 className='animate-spin' size={15} /> : <Download size={15} className='' />}
              <p> {downloading ? "Exportando" : "Exportar Excel"} </p>
            </button>
          )}


        </div>

      </div>

      {incomes.length == 0 ? (
        <div className='text-center'>
          <p>Aun no has registrado ingresos</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {incomes.map(item => (
            <div key={item.id} className='group relative hover:bg-gray-50 p-4 flex items-center gap-5 flex-wrap rounded-lg'>

              <div className='size-13 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                {item.icon ? (
                  <span className='text-2xl'> <img src={item.icon} className='size-7' alt="" /> </span>
                ) : (
                  <Layers2 className='text-purple-800' size={24} />
                )}
              </div>

              <div className='flex-1 flex items-center justify-between'>

                <div className=''>
                  <p className='text-md text-gray-700 font-medium'>{item.name}</p>
                  <p className='text-sm text-gray-400 font-medium mt-1 capitalize'>{item.date}</p>
                </div>

                <div className='flex items-center gap-3'>

                  <div
                    onClick={() => onDelete(item.id)}
                    className='text-slate-500 hidden group-hover:block cursor-pointer'>
                    <Trash2 size={16} />
                  </div>

                  <div className='flex items-center gap-2 bg-emerald-50 py-1 px-3 text-emerald-800 font-semibold 
                  rounded-sm border-1 border-emerald-100 text-sm'>
                    <p>S/ {item.amount}</p>
                    <TrendingUp size={15} />
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )

}
