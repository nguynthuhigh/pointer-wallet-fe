import Header from '../components/header/header_dashboard'
import partnerAPI from '../api/partner.api'
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom"
import AddWebHook from '../components/webhook/add-webhook';
import ViewWebHook from '../components/webhook/view-webhook';
import SideBar from '../components/dashboard/sidebar';
export default function WebHook(){
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(true)
    const [webhook,setWebhook] = useState(null)
    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await partnerAPI.getProfilePartner();
         
            if(response.status === 200){
                setWebhook(response.data.data.partner.webhook)
            }
            if(response.data.data.partner?.name === undefined){
                navigate('/update-profile')
            }
          } catch (error) {
            console.log(error)
            navigate('/sign-in')
          }
          finally{
            setIsLoading(false)
          }
        };
        fetchData(); 
      },[]);
    if(isLoading){
        return<div>...Loading</div>
    }
    return<div className='flex'>
      <div className='w-[30%]'>
        <SideBar state="Developer"></SideBar>
      </div>
      <div className='w-full'>
            {webhook ? <ViewWebHook webhook={webhook}></ViewWebHook> : <AddWebHook></AddWebHook>}

          </div>
        <div className='w-[35%]'>
        
        </div>
    </div>
}