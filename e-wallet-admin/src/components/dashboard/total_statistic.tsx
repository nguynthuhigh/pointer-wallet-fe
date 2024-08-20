import React from 'react'
import CountUp from 'react-countup'
const TotalStatistic = ({...props}) => {
  return (
    <div className=' w-[100%] bg-white rounded-xl p-4'>
        <div className='flex'>
            <div>
                <h1 className='font-semibold text-gray-600 text-sm'>{props.title}</h1>
                <h1 className='font-bold text-gray-700 text-2xl mt-2'>
                    <CountUp start={0} 
                            end={props.value}
                            decimal=","
                    />
                </h1>
            </div>
            <div className={`w-12 h-12 ml-auto flex items-center justify-center  rounded-2xl ${props.color}`}>
                <img className='w-6 ' src={props.image}></img>
            </div>
        </div>
        <h1 className='mt-5 text-sm font-semibold text-gray-600'><span className='text-green-500'>8,5% </span>Up from yesterday</h1>
    </div>
  )
}

export default TotalStatistic