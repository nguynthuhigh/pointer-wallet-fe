import { Link } from 'react-router-dom'

const SideBarPart = ({...props}) => {
  return (
    <Link to={props.link} onClick={props.handleSelect} className='w-full'>
      <div className={`flex w-full min-h-[64px] items-center rounded-[16px] px-4 hover:bg-gray-200 transition-colors duration-300 ${props.name === props.selected ? 'bg-[#0094FF] hover:bg-[#0094FF]' : ''}`}>
        <div className={`flex-shrink-0 w-[60px] flex items-center justify-center ${props.name === props.selected ? 'text-white' : 'text-gray-900'}`}>
          {props.icon}
        </div>
        <div className={`flex-grow w-[120px] font-semibold transition-colors duration-300 ${props.name === props.selected ? 'text-white' : 'text-gray-800'}`}>
          {props.name}
        </div>
      </div>
    </Link>
  )
}

export default SideBarPart
