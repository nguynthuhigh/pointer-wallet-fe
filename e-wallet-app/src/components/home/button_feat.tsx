import React from 'react'

const ButtonFeature = ({...props}) => {
  return (
    <div className={`w-full flex  flex-col items-center justify-center`}>
    <div className={`rounded-full hover:bg-slate-200 cursor-pointer bg-gray-500 px-4 w-14 h-14 flex items-center`}>
        <img src={props.image}></img>
    </div>
    <h1 className={`text-sm text-center`}>{props.title}</h1>
</div>
  )
}

export default ButtonFeature