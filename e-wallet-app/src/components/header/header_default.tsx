import BackArrow from '../../assets/svg/back_arrow.svg'
import { Link } from 'react-router-dom'
const HeaderDefault = ({...props}) => {
  return (
    <div class={`my-2 font-semibold flex justify-between text-lg`}>
        <button onClick={props.onClick}><img class={`w-3`} src={BackArrow}></img></button>
        <h1>{props.title}</h1>
        <div></div>
      </div>
  )
}

export default HeaderDefault