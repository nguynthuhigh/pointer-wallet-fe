import { useState } from "react"
import creditCardType from 'credit-card-type'
import paymentAPI from '../../../api/payment-gateway.api'
const Icon = ({type})=>{
    if(type === 'visa'){
        return <img alt='' className='w-[30px] absolute right-0 top-0 mt-3 mr-2 mx-[2px] border-[1px] border-gray-300 p-1 rounded-[5px]' src='https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png'></img>
    }
    if(type === 'mastercard'){
        return <img alt='' className='w-[25px] absolute right-0 top-0 mt-[10px] mr-2 mx-[2px] border-[1px] border-gray-300 p-1 rounded-[5px]' src='https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1587-tygju446.png'></img>
        
    }
    if(type === 'jcb'){
        return <img alt='' className='w-[25px] absolute right-0 top-0 mt-3 mr-2 mx-[2px] border-[1px] border-gray-300 p-1 rounded-[5px]' src='https://static-00.iconduck.com/assets.00/jcb-icon-2048x1537-sqmx1xp9.png'></img>
         
    }
}
export default function TabCard({dataTransaction}){
    const [isLoading,setIsLoading] = useState(false)
    const [numberCard,setNumberCard] = useState('')
    const [dataCard,setDataCard] = useState({name_card:'',number_card:'',expiration_card:'',cvv:'',email:''})
    const [typeCard,setTypeCard] = useState(null)
    const [error,setError] = useState({name_card:null,number_card:null,expiration_card:null,cvv:null})
    const handlePayment =async(e)=>{
        e.preventDefault()
        if(typeCard === undefined ||numberCard.length < 14 || numberCard.length > 16){
            setError({number_card:'Số thẻ không hợp lệ'})
        }
        const body = {
            transactionID:dataTransaction._id,
            email:dataCard.email,
            card:numberCard
        }
        try {
            setIsLoading(true)
            const response =await paymentAPI.paymentWithCard(body)
            console.log(response)
            if(response.status === 200){
                window.location.replace(response.data.data.return_url)
            }
        } catch (error) {
            setIsLoading(false)
        }

    }
    const handleCard = (e)=>{
        e.preventDefault()
        setDataCard({
            ...dataCard,
            [e.target.name]: e.target.value
        })
      
    }
    const handleNumberCard =(e)=>{
        setNumberCard(e.target.value)
        setTypeCard(creditCardType(numberCard)[0]?.type)
        setError({
            number_card:null
        })
    }
    return<div className="w-[650px] bg-white h-[572px] rounded-xl">
            <section class="bg-white mx-auto rouned-xl mt-10 w-full py-8 antialiased dark:bg-gray-900 md:py-16">
      <h2 class="text-xl mx-auto w-full  font-semibold text-gray-900 dark:text-white sm:text-2xl ml-8">Thanh toán</h2>

        <form onSubmit={handlePayment} action="#" class="w-full mx-auto   my-auto rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
          <div class="mb-6 grid mx-auto w-full grid-cols-2 gap-4">
          <div class="col-span-2 sm:col-span-1">
              <label for="email" className={!error.name_card ? `mb-2 block text-sm font-medium text-gray-900 dark:text-white`: `mb-2 block text-sm font-medium text-gray-900 dark:text-white`}> Email* </label>
              <input type="email" value={dataCard.email} onChange={handleCard} name="email" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="card@presspay.com" required />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="name_card" className={!error.name_card ? `mb-2 block text-sm font-medium text-gray-900 dark:text-white`: `mb-2 block text-sm font-medium text-gray-900 dark:text-white`}> Tên thẻ* </label>
              <input type="text" value={dataCard.name_card} onChange={handleCard} name="name_card" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="NGUYEN VAN A" required />
            </div>

            <div class="col-span-2 sm:col-span-1">
              
              <div className="flex">
                <label for="card-number-input" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Số thẻ* </label>
                <div class="mb-2 block text-sm font-medium text-red-600 dark:text-white ml-2 ">{error.number_card}</div>
              </div>
              <div className="relative">
                <input type="text" value={numberCard} onChange={handleNumberCard} name="number_card" class={!error.number_card ?  `block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  `:`block w-full rounded-lg border-[1px] border-red-500`} placeholder="xxxx-xxxx-xxxx-xxxx"  required />
                <Icon type={typeCard}></Icon>
              </div>
            </div>

            <div>
              <label for="card-expiration-input" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Ngày hết hạn* </label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
              </div>
            </div>
            <div>
              <label for="cvv-input" class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                CVV*
                <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                  <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div id="cvv-desc" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  The last 3 digits on back of card
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </label>
              <input type="number" maxLength={3} value={dataCard.cvv} onChange={handleCard} name="cvv" id="cvv-input" aria-describedby="helper-text-explanation" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
            </div>
          </div>

          {isLoading ? <button disabled type="submit" class="flex w-full items-center justify-center rounded-lg bg-gray-300  px-5 py-2.5 text-sm font-medium text-white"><Spin></Spin></button> : <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300">Thanh toán</button>}
        </form>
</section>

    </div>
}

const Spin = ()=>{
    return <>
        <div role="status">
    <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
    </>
}