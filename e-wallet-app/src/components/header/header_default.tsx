import BackArrow from '../../assets/svg/back_arrow.svg'
const HeaderDefault = ({...props}) => {
  return (
    <div className='flex'>
        <img src={BackArrow}></img>
        <h1>{props.title}</h1>
        <img></img>
    </div>
  )
}

export default HeaderDefault