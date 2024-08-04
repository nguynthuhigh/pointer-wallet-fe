import Header from '../../header/header_dashboard'
import { ItemTransaction } from '../components/item_transaction'
import partnerAPI from '../../../api/partner.api'
import { useEffect, useState } from "react"
 
export default function LastestPaymen() {
    const [isLoading,setIsLoading] = useState(true)
    const [transactionData,setTransactionData] = useState(null)
    useEffect(()=>{
      const fetchData =async ()=>{
        const response = await partnerAPI.getTransactions(1,5)
        if(response.status === 200){
          setTransactionData(response.data.data.transaction)
          console.log(transactionData)
          setIsLoading(false)
        }
      }
      fetchData()
    },[])
  return (
    <div class="mt-10 rounded-xl p-8 border-[1px]  w-full">
            <div className='font-semibold text-xl'>Lastest 5 transactions</div>

              <div class="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead class="bg-gray-50 dark:bg-neutral-700">
                      <tr>
                        <th scope="col" class="py-3 px-4 pe-0">
                          <div class="flex items-center h-5">
                            <input id="hs-table-pagination-checkbox-all" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                            <label for="hs-table-pagination-checkbox-all" class="sr-only">Checkbox</label>
                          </div>
                        </th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Amount</th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Description</th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Transaction ID</th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Order ID</th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">DATE</th>


                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                    {isLoading ? '...loading' : transactionData.map((item)=>(
                      <ItemTransaction item={item}></ItemTransaction>
                    ))}
                    </tbody>
                  </table>
                </div>
           
              </div>
          </div>
  );
}