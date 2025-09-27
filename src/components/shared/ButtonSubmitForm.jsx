import { Loader2 } from 'lucide-react'
import React from 'react'

export const ButtonSubmitForm = ( {isAdding, isEditing, state } ) => {
    return (
        <button
            disabled={isAdding || isEditing}
            className={`bg-purple-800 text-white shadow-lg py-2 px-3 rounded-sm cursor-pointer text-sm flex items-center gap-2 ${(isAdding || isEditing) && "bg-purple-800/60"}`}>
            {(isAdding || isEditing) && <Loader2 className='animate-spin size-4' />}
            {state ? "Editar" : "Crear"}
        </button>
    )
}
