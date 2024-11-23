import {motion} from 'framer-motion'

export const AreaCard = ({name,icon:Icon,value,color} : {name:string,icon:any,value:string,color:string}) => {
  return (
    <>
        <motion.div
          className='bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-md overflow-hidden shadow-lg rounded-[6px] border border-gray-700'
          whileHover={{y: -5, boxShadow: '0 15px 50px -12px rgba(0,0,0,0.5)'}}
        >
            <div className='px-4 py-5 sm:p-6'>
              <p className='flex items-center text-md font-medium text-gray-400'>
                <Icon size={20} className = 'mr-2' style = {{color: color}}/>
                {name}
              </p>
              <p className='mt-1 text-3xl font-semibold text-gray-100'>{value}</p>
            </div>
        </motion.div>
    </>
  )
}