import React from "react"
import HeaderDefault from "../../components/header/header_default"
import PartnerInfo from "../../components/history_transaction/partner_info"
import UserInfo from "../../components/history_transaction/user_info"

const TransactionDetails:React.FC = () => {

  return (
    <div class={`container-center font-semibold`}>
      <HeaderDefault title={'Chi tiết giao dịch'}></HeaderDefault>
      <div class={`flex items-center justify-between`}>
       <div class={`flex items-center`}>
          <img class={`w-20 h-20 `} src='https://yte.viettel.vn/upload/1000337/20210118/Viettel-without_slogan-01_34bf1bf614.png'></img>
            <div class={`ml-2`}>
              <h1 class={`text-gray-400`}>Thanh toán hóa đơn</h1>
              <h1>Viettel</h1>
            </div>
        </div>
        <h1>2024-09-09</h1>
      </div>
      <hr></hr>
      
      <div class={` p-4 my-2`}>
        <div class={`flex items-center justify-between my-3`}>
          <h1 class={`text-4xl`}>-150,000đ</h1>
          <h1 class={`bg-green-50 text-green-500 w-fit h-fit p-1.5 rounded-full text-sm`}>✔ Completed</h1>
        </div>
      </div>
     <PartnerInfo></PartnerInfo>
     <UserInfo></UserInfo>
    </div>
  )
}

export default TransactionDetails