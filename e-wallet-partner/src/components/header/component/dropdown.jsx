import Cookies from "universal-cookie"
import { Link,useNavigate } from "react-router-dom"
import logo_white from '../../../assets/svg/logo_white.svg'

export default function DropDown(){
    const cookie = new Cookies()
    const navigate = useNavigate()

    const handleLogout = ()=>{
        cookie.remove('token_auth')
        navigate('/')
    }
    return(
        

<nav class="bg-color-default border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2.5">
    <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo_white} class="h-12" alt="Flowbite Logo" />
    </Link>
    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 ms-3 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul class="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:text-sm  md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:space-x-8 md:rtl:space-x-reverse">
        <li>
          <Link to="/dashboard" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Dashboard</Link>
        </li>
        <li>
          <Link to="/voucher" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Voucher</Link>
        </li>
        <li>
          <Link to="/history-payment" class="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "> Payment History</Link>
        </li>
        <li>
        <details className="dropdown cursor-pointer">
            <summary className="text-gray-700">Developer</summary>
            <ul className="menu dropdown-content text-gray-700 bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                    <Link to="/webhook" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Webhook</Link>
                  </li>
                  <li>
                    <Link to="/docs" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Documents</Link>
                  </li>
                  <li>
                    <Link to="/demo" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Payment gateway (demo)</Link>
                  </li>
            </ul>
        </details>
        </li>
        <li>
          <button onClick={handleLogout} class="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

    )
}