import { Link } from 'react-router-dom'

const SideBarPart = ({...props}) => {
  return (
    <Link to={props.link} onClick={props.handleSelect} className='w-[190px] '>
      <div className={`flex w-fit min-h-[44px] items-center rounded-[4px] hover:bg-gray-200 transition-colors duration-300 ${props.name === props.selected ? 'bg-[#0094FF] hover: ADB5DB' : ''}`}>
        <div className={`flex-shrink-0 w-[50px] flex justify-center ${props.name === props.selected ? 'text-[#FFFFFF]' : 'text-[#ADB5DB]'}`}>
          {props.icon}
        </div>
        <div className={`flex-grow w-[140px] transition-colors duration-300 ${props.name === props.selected ? 'text-[#FFFFFF]' : 'text-[#ADB5DB]'}`}>
          {props.name}
        </div>
      </div>
    </Link>
  )
}

export default SideBarPart
