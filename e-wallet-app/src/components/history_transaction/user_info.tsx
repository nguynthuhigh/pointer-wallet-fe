import React from 'react'
interface UserInfoProps{
  _id:string,
  userID:string,
  sender:{
    _id:string,
    email:string,
    full_name:string
  },
  receiver:{
    _id:string,
    email:string,
    full_name:string
  },
  message:string
}
const UserInfo:React.FC<UserInfoProps> = (props) => {
  return (
    <div class={`border rounded-xl p-4`}>
      <div class={`pb-2`}>
        <h1  class={`text-gray-400`}>Mô tả</h1>
        <h1 >{props.message || 'Không có nội dung'}</h1>
      </div>
      <hr></hr>
      <div>
        <h1  class={`text-gray-400`}>Thông tin giao dịch</h1>
          <div class={`flex items-center justify-between my-3`}>
            <h1>Mã giao dịch</h1>
            <h1>{props._id}</h1>
          </div>  
        <div class={`flex items-center justify-between my-3`}>
          <h1>{props.sender._id === props.userID ? 'Người nhận' : 'Người gửi'} </h1>
          <h1>{props.sender._id !== props.userID ? props.sender.full_name : props.receiver.full_name}</h1>
        </div>  
        <div class={`flex items-center justify-between my-3`}>
          <h1>Email</h1>
          <h1>{props.sender._id !== props.userID ? props.sender.email : props.receiver.email}</h1>
        </div>
        
      </div>
      <div>
      </div>
     
    </div>
  )
}

export default UserInfo