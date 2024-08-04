import { useState,useEffect } from "react"
import webhookAPI from '../../../api/webhook.api'

export default function ViewWebHook({webhook}){
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    const [toggle,setToggle] = useState(false)

    const hanldeDelete = async(e)=>{
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
    return<div  className="flex"> 
        <div className='font-semibold'>Your webhook endpoint <div className='text-green-600'>{webhook}</div></div>
        {toggle ? <div className="flex"><button onClick={hanldeDelete} className="w-fit text-center text-white flex items-center mt-5 bg-red-600  font-medium ml-auto rounded-lg text-sm px-5 py-2.5 mx-auto">Confirm</button> <button onClick={()=>{setToggle(!toggle)}} className="w-fit text-center text-white flex items-center mt-5 bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 mx-auto">Close</button></div> : <button onClick={()=>{setToggle(!toggle)}}   className="w-fit text-center text-white flex items-center mt-5 bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5 mx-auto">Delete</button>}
    </div>
}
