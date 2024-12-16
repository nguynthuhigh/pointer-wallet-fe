import { useState } from "react"
import {Eye,EyeOff} from 'lucide-react'
const ShowHide = ({text}) => {
    const [show,setShow] = useState(false);
    const handleShow = () => {
        setShow((hide) => !hide)
    }
    return (
        <>
            <div className="flex items-center ml-2 space-x-[5px]">
                <p >{show ? text : '***************************'}</p>
                <button
                    onClick={handleShow}
                >
                    {
                        show ? (
                            <Eye className="size-[16px]"/>
                        ) : (
                            <EyeOff className="size-[16px]"/>
                        )
                    }
                </button>
            </div>
        </>
    )
}
export default ShowHide