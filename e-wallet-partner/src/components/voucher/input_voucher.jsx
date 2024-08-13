import React from 'react'

const InputVoucher = ({...props}) => {
    return (
    <div>
        <label className="block text-lg font-semibold mb-2">{props.name}</label>
        <input
        className="w-full border border-gray-300 rounded-lg p-2 "
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
        required
        />
        {props?.error && <p className="text-red-500 text-sm mt-1">{props?.error}</p>}

  </div>
  )
}

export default InputVoucher