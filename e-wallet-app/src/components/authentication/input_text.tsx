const InputText = ({...props}) => {
  return (
    <div class={`my-2`}>
        <label class={`font-semibold text-gray-400 ml-2 text-sm`} name={props.name}>{props.title}</label>
        <input onChange={props.onChange} required type={props.type} name={props.name} placeholder={props.placeholder} class={`pl-2 focus:outline-blue-default text-sm w-full border-2 py-3  rounded-xl p-2 ${props.error && "border-red-400"}`}></input>
    </div> 
  )
}

export default InputText