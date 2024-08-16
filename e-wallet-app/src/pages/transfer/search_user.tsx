import { useState } from "preact/hooks"
import HeaderDefault from '../../components/header/header_default'
import { useDebouncedCallback } from "use-debounce"
import { getUserByEmail } from "../../services/api/transfer.api"
import { User } from "../../types/transfer"
import avatar from '../../assets/png/default_avatar.png'
const SearchUser = ({...props}) => {
    const [data,setData] = useState<User |null>()
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const handleSelectUser = ()=>{
        props.handleStepTransfer('input_amount')
    }
    const handleUserData = (data:any)=>{
        setIsLoading(true)
        props.handleUserData(data)
    }
    const debounced = useDebouncedCallback(async(string:string)=>{
        try {
            setIsLoading(true)
            const response = await getUserByEmail(string)
            if(response.status===200){
                setData(response.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error) 
        }
    },1000)
    return (
        <div class={`p-4`}>
        <HeaderDefault onClick={()=>{props.handleStepTransfer('select_currency')}} title="Tìm kiếm người nhận"></HeaderDefault>
        <input name='search' 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {const { name, value } = e.target as HTMLInputElement;debounced(value.toLowerCase())}}  
                class={`pl-4 text-sm p-1.5 w-full border rounded-full`} placeholder={`Nhập email hoặc username`}></input>
        {isLoading ? '' : <InfoUser data={data} handleSelectUser={handleSelectUser} handleUserData={handleUserData}></InfoUser>}
        </div>
        
    )
    }
    const InfoUser = ({...props})=>{
    return (
        <div onClick={()=>{props.handleSelectUser(); props.handleUserData(props.data)}} class={`flex w-full rounded-lg items-center font-semibold p-2 cursor-pointer hover:bg-gray-100 mt-4`}>
        <img class={`w-10 h-10 rounded-full object-cover`} src={props.data.avatar ? props.data.avatar :  avatar}></img>
        <div class={`ml-4`}>
            <h1 class={`text-lg`}>{props.data.full_name}</h1>
            <h1 class={`text-sm text-gray-500`}>{props.data.email}</h1>
        </div>
        </div>
    )
    }
    export default SearchUser