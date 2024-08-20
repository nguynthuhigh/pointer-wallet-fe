import React from 'react'
import VNDIcon from '../../assets/png/vnd_icon.png'
import SendMoneyIcon from '../../assets/svg/send_money.svg'
const FormatIcon = ({type}:{type:string}) => {
    if(type ==='transfer'){
        return <img src={SendMoneyIcon} className={`w-12 h-12 my-auto`}></img>
    }
    else if(type === 'payment'){
        return <img src={VNDIcon} className={`w-12 h-12 my-auto`}></img>
    }
    else return <img src={SendMoneyIcon} className={`w-12 h-12 my-auto`}></img>
    
}

export default FormatIcon