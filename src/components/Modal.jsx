import { X } from "lucide-react"
import { useEffect, useRef } from "react"

export const Modal = ({ open, setOpen, children }) => {

    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            const elem = event.target
            if (modalRef.current && !modalRef.current.contains(elem) ) {
                setOpen(false)
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    if(!open){
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-black/50 z-50 flex items-center justify-center" >

            <div className="w-full max-w-lg px-4" ref={modalRef}>

                <div className="bg-white p-5 rounded-[6px] relative ">
                    {children}
                    <CloseButton setOpen={setOpen} />
                </div>

            </div>

        </div>
    )

}

const CloseButton = ({ setOpen }) => {
    return (
        <div
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 cursor-pointer">
            <X className="size-5 text-slate-700" />
        </div>
    )
}