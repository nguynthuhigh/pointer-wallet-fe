import { useState,useEffect } from "react"
import webhookAPI from '../../api/webhook.api'
import ModalDelete from "../modals/modal_delete"
export default function ViewWebHook({webhook}){
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    const [toggle,setToggle] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const handleDelete = async(e)=>{
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await webhookAPI.deleteWebhook()
            if(response.status === 200){
                setIsLoading(false)
                alert("Deleted")
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message)
            setIsLoading(false)
        }
    }
    const handleClose =(e)=>{
        e.preventDefault();
        setIsOpen(!modalIsOpen)
    }
    return<div  className="flex"> 
        <ModalDelete title="Do you want delete it?" isOpen={modalIsOpen} handleDelete={handleDelete} handleClose={handleClose}></ModalDelete>

        <div className='font-semibold'>Your webhook endpoint <div className='text-green-600'>{webhook}</div></div>
        <button onClick={handleClose}>
            <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&s"></img>
        </button>
    </div>
}
