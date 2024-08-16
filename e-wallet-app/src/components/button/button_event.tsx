import React from 'react'

const ButtonEvent = ({...props}) => {
  return (
    <button onClick={props.onClick} class={`w-full mt-10  p-3 bg-blue-600 font-semibold text-white rounded-full `}>
        {props.event}
    </button>
  )
}

export default ButtonEvent