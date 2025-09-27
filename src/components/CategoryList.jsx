import { Edit, Layers2, Pencil, X } from 'lucide-react'
import React from 'react'

export const CategoryList = ({ categories, onEdit, onDelete }) => {

  return (
    <>
      <div className='bg-white rounded-lg shadow-2xl p-4'>

        {categories.length == 0 ? (
          <p className='text-gray-500 text-center w-full '>Aun no has registrado categorias</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {categories.map( category => (
              <div key={category.id} className='group relative flex items-center gap-4 p-4 rounded-lg 
              hover:bg-gray-50 '>

                {/* icon emoji */}
                <div className='size-16 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                  { category.icon ? (
                    <span className='text-2xl'> <img src={category.icon} className='size-10' alt="" /> </span>
                  ) : (
                    <Layers2 className='text-purple-800' size={24} />
                  ) }
                </div>

                <div className='flex-1 flex items-center justify-between'>
                  <div className=''>
                      <p className='text-sm text-gray-700 font-medium'>{category.name}</p>
                      <p className='text-sm text-gray-400 font-medium mt-1 capitalize'>
                        {category.type == "expense" ? "Gasto" : "Ingreso" }
                      </p>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <div 
                    onClick={ () => onEdit(category) }
                    className='hover:bg-gray-200 size-8 flex items-center justify-center rounded-full cursor-pointer'>
                      <Edit className='size-4 text-slate-700' />
                    </div>
                    <div 
                    onClick={() => onDelete(category.id)}
                    className='hover:bg-gray-200 size-8 flex items-center justify-center rounded-full cursor-pointer'>
                      <X className='size-4 text-slate-700' />
                    </div>
                  </div>
                </div>
                
              </div>
            ) )}
          </div>
        )}

      </div>

    </>
  )

}
