import Header from '../../components/header/header'
import paymentAPI from '../../api/payment-gateway.api'
import { useState } from 'react'
export default function Demo(){
    const [formData,setFormData]  = useState({amount:null,private_key:null,currency:null,message:"1",return_url:null,orderID:null})
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const hanldeCreatePayment =async (e)=>{
        e.preventDefault(); 
        setIsLoading(true)
        try {
            const body ={
                private_key:formData.private_key,
                amount:formData.amount,
                currency:formData.currency,
                message:formData.message,
                return_url:formData.return_url,
                orderID:formData.orderID,
                userID:"userO1"
            }
            const response = await paymentAPI.paymentSend(body)
            if(response.status === 200){
                window.location.replace(response.data.url)
            }
        } catch (error) {
            setError(error.response.data.message)
            setIsLoading(false)
        }
    }
    const handleChange = (e)=>{
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const hanldeFill = (e)=>{
        e.preventDefault()
        setError(null)
        setFormData({
            private_key:"pk_presspay_82fad953e33c472656094ab3b6a3d7d3553d3215ea09fda4e7d363caae555811",
            currency:"VND",
            amount:"200000",
            message:"Áo postman x2",
            return_url:"https://presspay.vercel.app/success",
            orderID:'order00000011111',
        })
        console.log(formData)
    }
    return(<>
        <Header color={true}></Header>
        <div className='pt-20 flex max-w-[1200px] mx-auto'>
            <div className='w-[50%]'>

                <form className='' onSubmit={hanldeCreatePayment}>
                <div class="mb-6 ">
                        <div className='flex items-center'><label for="private_key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Private key</label></div>
                        <input value={formData.private_key}  onChange={handleChange} type="text" id="private_key" name="private_key" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 h-[50px]"/>
                    </div>
                    <div class="mb-6">
                        <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input value={formData.amount}  onChange={handleChange}  type="text" id="default-input" name="amount" class="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-[50px] block  p-2.5 "/>
                    </div>
                    <div>
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
                        <input value={formData.currency}  onChange={handleChange}  type="text" id="small-input" name="currency" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 h-[50px] focus:border-blue-500 "/>
                    </div>
                    
                    {error ? <div className='text-red-600'>{error}</div> : ''}
      
                    {isLoading ? <button disabled  className='bg-gray-300 text-white rounded-xl mt-5 p-4 py-2 font-semibold'>Create payment</button> : <button  className='bg-blue-500 text-white rounded-xl mt-5 p-4 py-2 font-semibold'>Create payment</button>}
                </form>
            </div>
            <div>
                <button onClick={hanldeFill} className='text-sm mt-10 ml-5 font-medium text-white mr-auto w-fit bg-blue-500 border-[1px] border-white px-4 pt-1 rounded-xl'>Fill in sample data</button>
            </div>
        
     

        </div>
    </>)
}