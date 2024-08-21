import React from 'react'
import { Link } from 'react-router-dom'

const SideBarPart = ({...props}) => {
  return (
    <Link to={props.link} onClick={props.handleSelect} className='h-[50px] my-2 w-full flex'>
        <div className={`h-full w-[5px] rounded-r-lg transition-all duration-300 ${props.name === props.selected && 'bg-blue-600'}`}></div>
        <div className={`flex h-full w-full items-center rounded-lg ml-4 px-4 hover:bg-gray-100 transition-colors duration-300 ${props.name === props.selected && 'bg-blue-500 hover:bg-blue-400'}`}>
            <img className='w-[20px] transition-transform duration-300' src={props.icon}></img>
            <h1 className={`font-semibold ml-2 transition-colors duration-300 ${props.name === props.selected ? 'text-white' : 'text-gray-800'}`}>{props.name}</h1>
        </div>
    </Link>
  )
}

export default SideBarPart