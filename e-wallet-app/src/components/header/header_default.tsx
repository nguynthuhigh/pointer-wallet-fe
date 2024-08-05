import BackArrow from '../../assets/svg/back_arrow.svg'
import { Link } from 'react-router-dom'
const HeaderDefault = ({...props}) => {
  return (
    <div className='flex p-4 justify-between'>
        <Link to=''>
          <img src={BackArrow}></img>
        </Link>
        <h1 class={`text-lg font-semibold`}>{props.title}</h1>
        <img></img>
    </div>
  )
}

export default HeaderDefault