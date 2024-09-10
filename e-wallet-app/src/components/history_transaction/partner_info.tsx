import React from 'react'

const PartnerInfo:React.FC = () => {
  return (
    <div class={`border rounded-xl p-4`}>
    <div>
        <h1  class={`text-gray-400`}>Mô tả</h1>
        <h1>12312312 ABCDASDA</h1>
      </div>
      <hr></hr>
      <div>
        <h1  class={`text-gray-400`}>Thông tin giao dịch</h1>
          <div class={`flex items-center justify-between my-3`}>
            <h1>Mã giao dịch</h1>
            <h1>123123123123</h1>
          </div>  
        <div class={`flex items-center justify-between my-3`}>
          <h1>Nhà cung cấp </h1>
          <h1>Viettel</h1>
        </div>  
        <div class={`flex items-center justify-between my-3`}>
          <h1>Mã đơn hàng</h1>
          <h1>123123-123123-123123</h1>
        </div>
        <div class={`flex items-center justify-between my-3`}>
          <h1>Mã khách hàng</h1>
          <h1>123123-12312312-3123123</h1>
        </div>    
      </div>
      <div>
      </div>
     
    </div>
  )
}

export default PartnerInfo