import React from 'react'
interface SelectProps {
  name:string
  handleOpenModal: (field:string) => void
  field:string
}
const Select: React.FC<SelectProps> = (props) => {
  return (
    <div class={`focus:bg-slate-50`} onClick={()=>{props.handleOpenModal(props.field)}}>
        <div class={`p-2 w-full cursor-pointer my-1`}>
          <h1>{props.name}</h1>
          <img></img>
        </div>
    </div>
  )
}

export default Select