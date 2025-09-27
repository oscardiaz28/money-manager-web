import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { Image, X } from 'lucide-react'
import React, { useState } from 'react'

export const EmojiPickerPopup = ({ icon, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleEmoji = (emoji) => {
        onSelect(emoji?.imageUrl || "")
        setIsOpen(false)
    }

    return (
        <div>
            {icon && <button onClick={() => onSelect("")} type='button' className='border-1 border-gray-200 bg-white shadow-lg size-6 flex items-center justify-center rounded-full cursor-pointer ml-7'><X className='size-4 text-purple-800' /></button> }

            <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
                <div
                    onClick={() => setIsOpen(true)}
                    className='flex items-center gap-4 cursor-pointer'>
                    <div className='bg-purple-50 rounded-lg text-purple-800 size-12 flex items-center justify-center text-2xl'>
                        {icon ? (
                            <img src={icon} alt="" className='size-12' />
                        ) : (
                            <Image />
                        )}
                    </div>
                    <p className='text-slate-700'>{icon ? "Cambiar Icono" : "Seleccionar Icono"}</p>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="relative bg-white rounded-xl shadow-lg p-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                            <EmojiPicker
                                open={isOpen}
                                onEmojiClick={handleEmoji}
                                skinTonesDisabled={true}
                                emojiStyle={EmojiStyle.APPLE}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
