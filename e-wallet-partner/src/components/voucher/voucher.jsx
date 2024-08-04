import { useEffect, useState } from 'react'
import Header from '../header/header_dashboard'
import { Link } from 'react-router-dom'
import partnerAPI from '../../api/partner.api'
import { useNavigate } from 'react-router-dom';
import voucherAPI from '../../api/voucher.api'
export default function Voucher(){
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isLoading,setIsLoading] = useState(true)
    const [data,setData] = useState(null)
    const [itemDelete,setItemDelete] = useState('')
    const [itemDeleteID,setItemDeleteID] = useState('')
    
    useEffect(()=>{
        document.title = 'Voucher'
        const fetchVouchers = async ()=>{
            try {
                
                const response = await partnerAPI.getVouchers()
                if(response.status === 200){
                    setData(response.data.data)
                    console.log(response.data.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }

        }
        fetchVouchers()
    },[])
    return(<>
        <Header></Header>
        <div className="max-w-[1200px] mx-auto bg-gray-50 ">
            <div className='flex my-2 items-center'><h1 className='font-bold text-xl py-2'> List vouchers</h1><Link className='ml-auto mr-2 rounded-xl bg-blue-600 font-semibold text-white py-2 px-4' to='/add-voucher'>Add voucher</Link></div>
        <table className="rounded-xl w-full">
            <tr className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <th scope="col" class="p-4">Ordinal</th>
                <th scope="col" class="p-4">Title</th>
                <th scope="col" class="p-4">Description</th>
                <th scope="col" class="p-4">Code</th>
                <th scope="col" class="p-4">Quantity</th>
                <th scope="col" class="p-4">Used Count</th>
                <th scope="col" class="p-4">Discount</th>
                <th scope="col" class="p-4">Min</th>
                <th scope="col" class="p-4">Action</th>
            </tr>
                
            {isLoading ? '...Loading': data.map((item,key)=>(
                <tr className={`text-md text-gray-700  hover:bg-gray-100 bg-white`}>
                    <Item value={key+1}></Item>
                <Item value={item.title}></Item>
                <Item value={item.content}></Item>
                <Item value={item.code}></Item>
                <Item value={item.quantity}></Item>
                <Item value={item.usedCount}></Item>
                <Item value={item.discountValue}></Item>
                <Item value={item.min_condition}></Item>
                <Action id={item._id} onClick={()=>{setIsPopupVisible(!isPopupVisible);setItemDelete(item.code);setItemDeleteID(item._id)}}></Action>
            </tr>
            ))}
        </table>
        <PopupDelete isPopupVisible={isPopupVisible} itemToDelete={itemDelete} itemDeleteID={itemDeleteID} hideDeletePopup={()=>{setIsPopupVisible(!isPopupVisible)}}></PopupDelete>
    </div>
    </>)
}
const Item = ({value})=>{
    return(<td className="p-4 text-center cursor-pointer py-[20px]">{value}</td>)
}
const Action = ({id,onClick})=>{
    const navigate = useNavigate()
    return(
        <div className="mt-2">
            <button onClick={()=>{navigate('/edit-voucher?id='+id)}} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold mr-2">Edit</button>
            <button onClick={onClick} className="border-red-500 text-red-500 font-semibold border-[2px] px-4 py-[6px] rounded-xl">Delete</button>
        </div>
    )
}

const PopupDelete = ({isPopupVisible,itemToDelete,hideDeletePopup,itemDeleteID})=>{
    const confirmDelete =async()=>{
        try {
            const repsonse =await voucherAPI.deleteVoucher(itemDeleteID)
            if(repsonse.status === 200){
                alert(repsonse.data.message)
                window.location.reload();
                hideDeletePopup()
                
            }
        } catch (error) {
            alert(error?.repsonse?.data?.message)
        }
    }
    return(<>
        {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete {itemToDelete}?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={hideDeletePopup}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>)
}