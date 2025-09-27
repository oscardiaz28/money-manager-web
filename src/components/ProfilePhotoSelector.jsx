import { Trash, Upload, User } from 'lucide-react'
import React, { useRef, useState } from 'react'

export const ProfilePhotoSelector = ({ image, setImage }) => {

    const inputRef = useRef(null)
    const [preview, setPreview] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }
    const handleRemoveImage = () => {
        setImage(null)
        setPreview(null)
    }
    const onChooseFile = () => inputRef.current?.click();

    return (
        <div className='flex items-center justify-center w-full'>
            <input
            className='hidden' 
            ref={inputRef}
            type="file" onChange={handleImageChange} accept='.jpg, .jpeg, .png, .webp' />

            { !image ? (
                <div className='size-20 rounded-full flex items-center justify-center bg-purple-100 relative'>
                    <User className='text-purple-500 size-8' />
                    <button 
                    onClick={onChooseFile}
                    type='button' 
                    className='size flex items-center justify-center text-purple-500 absolute bottom-3 right-0 cursor-pointer'>
                        <Upload size={15} />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img src={preview} alt="" className='size-20 rounded-full object-cover' />
                    <button 
                    onClick={handleRemoveImage}
                    type='button'
                    className='rounded-full bg-red-700 size-7 flex items-center justify-center text-white absolute bottom-0 right-0'>
                        <Trash size={15} />
                    </button>
                </div>
            ) }
            
        </div>
    )

}
