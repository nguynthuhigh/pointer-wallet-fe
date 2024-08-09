import React, { useState } from 'react';
import { ReactComponent as TransactionIcon } from '../../assets/svg/transaction.svg';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';

import Logo from '../../assets/svg/logo_blue.svg';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const SideBar = ({ ...props }) => {
  const [selected, setSelected] = useState(props.state); 
  const handleSelect = (name) => {
    setSelected(name);
  };
  const cookie = new Cookies()
  const navigate = useNavigate()
  const  handleLogout = ()=>{
    cookie.remove('token_auth')
        navigate('/')
  }
  return (
    <div className="p-2 fixed">
      <div className="p-4">
        <img alt="" src={Logo} />
      </div>
      <ItemSidebar
        icon={<HomeIcon className={selected === 'Dashboard' ? 'stroke-white' : 'stroke-gray-700'} />}
        name="Dashboard"
        isSelected={selected === 'Dashboard'}
        onClick={() => handleSelect('Dashboard')}
        path='/dashboard'
      />
      <ItemSidebar
        icon={<TransactionIcon className={selected === 'Transaction History' ? 'stroke-white' : 'stroke-gray-700'} />}
        name="Transaction History"
        isSelected={selected === 'Transaction History'}
        onClick={() => handleSelect('Transaction History')}
        path='/transaction-history'

      />

      <ItemSidebar
        name="Developer"
        isSelected={selected === 'Developer'}
        onClick={() => handleSelect('Developer')}
        path='/webhook'
      />
       <ItemSidebar
        name="Setting"
        isSelected={selected === 'Setting'}
        onClick={() => handleSelect('Setting')}
        path='/settings'
      />
      <div onClick={handleLogout} className='bottom-0 fixed'>
        Logout
      </div>
    </div>
  );
};

const ItemSidebar = ({ icon,path, name, isSelected, onClick }) => {
  return (
    <Link to={path} onClick={onClick}>
      <div
        className={`flex my-2 rounded-lg hover:bg-gray-100 p-4 cursor-pointer ${
          isSelected ? 'bg-blue-500' : ''
        }`}
      >
        {icon}
        <h1
          className={`ml-2 text-gray-700 font-semibold text-lg ${
            isSelected ? 'text-white' : ''
          }`}
        >
          {name}
        </h1>
      </div>
    </Link>
  );
};

export default SideBar;
