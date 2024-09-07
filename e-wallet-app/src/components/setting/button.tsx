import React from 'react'
import LoadingIcon from '../../assets/svg/loading.svg'
interface ButtonProps {
    name:string
    isLoading:boolean
}
const Button: React.FC<ButtonProps> = ({name,isLoading}) => {
  return (
    <>
    {isLoading ? 
    <button disabled class={`w-full font-semibold text-sm bg-gray-200 text-white p-3 rounded-full`}><img class={`animate-spin mx-auto`} src={LoadingIcon}></img></button>
    : <button  class={`w-full font-semibold text-sm bg-blue-default text-white p-3 rounded-full`}>{name}</button>}
    </>
  )
}

export default Button