import logo_white from '../../assets/svg/logo_blue.svg'
import { Link } from 'react-router-dom'

export default function Home(){
    return(
        <div className='w-full fixed z-10 my-4'>
            <div className='flex items-center px-4 max-w-[1250px] mx-auto'>
                <Link to="/">
                    <img alt='logo_presspay' src={logo_white}></img>
                </Link>
            </div>
        </div>
    )
}