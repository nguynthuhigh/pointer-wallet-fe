import { useState } from "react"
import { LoadingButtonWebhook } from "../../auth/loading"
import webhookAPI from '../../../api/webhook.api'
export default function AddWebHook(){
    const [isLoading,setIsLoading] = useState(false)
    const [webhookValue,setWebhookValue] = useState(null)
    const [notification,setNotification] = useState(null)
    const [error,setError] = useState(null)
    const hanldeChange = (e)=>{
        e.preventDefault();
        setError(null)
        setWebhookValue(e.target.value)
    }
    const isValidUrl = (string) => {
        try {
          new URL(string);
          return true;
        } catch (e) {
          return false;
        }
      }
    const hanldeRegister =async(e)=>{
        e.preventDefault();
        console.log(webhookValue)
        try {
            if(!isValidUrl(webhookValue)){
                setError("Invalid URL")
                return
            }
            setIsLoading(true)
            const response = await webhookAPI.addWebhook({endpoint:webhookValue})
            if(response.status === 200){
                console.log(response)
                setNotification("Webhook has been added successfully")
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message)
            setIsLoading(false)
        }
    }
    return<form onSubmit={hanldeRegister}> 
         <div>
            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register enpoint</label>
            <input type="text" onChange={hanldeChange} value={webhookValue} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="http://your.domain.com/hello-world" required />
        </div>
        <div className="text-green-400 mx-auto w-fit font-semibold">{notification}</div>
        <div className="text-red-500 mx-auto w-fit font-semibold">{error}</div>
        {isLoading ? <LoadingButtonWebhook/> : <button type="submit"  className="w-fit text-center text-white flex items-center mt-5 bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 mx-auto">Register</button>}

    </form>
}