import React from 'react'
import PartnerInfo from './partner_info'
import UserInfo from './user_info'
interface InfoDetailsProps{
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
    type:string,
    message:string

}
const InfoDetails:React.FC<InfoDetailsProps> = (props) => {
    switch(props.type){
        case 'transfer':
            return <UserInfo {...props}></UserInfo>
        case 'payment':
            return <UserInfo {...props}></UserInfo>
        default: return <></>
    }

}

export default InfoDetails