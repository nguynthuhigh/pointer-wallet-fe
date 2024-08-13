import React from 'react'

const InputField = ({...props}) => {
    return (
    <div>
        <label className="block text-sm font-semibold mb-2">{props.title}</label>
        <input
        name={props.name}
        className="w-full h-8 border bg-gray-50 focus:bg-white border-gray-300 rounded-lg p-2 "
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