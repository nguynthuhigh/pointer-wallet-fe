import React from 'react'

const InputField = ({...props}) => {
    return (
    <div>
        <label className="block text-md font-semibold mb-1">{props.title}</label>
        <input
        name={props.name}
        className="w-full border focus:bg-white border-gray-300 rounded-[6px] px-3 py-2 "
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
        disabled = {props.disabled}
        />
        {props?.error && <p className="text-red-500 text-sm mt-1">{props?.error}</p>}

  </div>
  )
}

export default InputField