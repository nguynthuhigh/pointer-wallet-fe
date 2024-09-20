import React from 'react'
import { GoDotFill } from "react-icons/go";
import AvatarDefault from '../../assets/png/Avatar.png'
import { useNavigate } from "react-router-dom";

export interface UserProps {
    _id: string;
    avatar?: string;
    full_name?: string;
    email: string;
    createdAt: string;
    updateAt?: string;
    inactive: boolean;
}

const UserCard:React.FC<UserProps> = ({_id, avatar, full_name, email, createdAt, inactive }) => {
    const navigate = useNavigate();

    const handleUserClick = (user: UserProps) => {
        const { avatar, full_name, email, createdAt, inactive } = user;
        navigate(`/listUser/detailListUser/${_id}`, { state: { avatar, full_name, email, createdAt, inactive } });
    };
    const formatDate = new Date(createdAt).toISOString().split('T')[0];

  return (
<div id="CardUser" className=" lg:hidden grid px-4 py-4 border rounded-[8px] bg-white shadow min-w-[200px] max-w-[310px]">
            <div className="flex items-center">
                <img src={avatar || AvatarDefault} className="rounded-full w-[40px] h-[40px] object-cover" />
                <div className="flex flex-col justify-center ml-2">
                    <div className="flex items-center">
                        <div>{full_name ? full_name : ""}</div>
                        <div className={`w-fit ${!inactive ? 'text-[#027A48] bg-[#ECFDF3]' : 'text-[#FF1717] bg-[#FFE3E3]'} h-[30px] px-[8px] rounded-[16px] flex items-center justify-center ml-2`}>
                            <GoDotFill className="mr-[4px]" />
                            <div className="text-sm">{!inactive ? 'Active' : 'Inactive'}</div>
                        </div>
                    </div>
                    <div className="text-sm text-[#0094FF]">{email}</div>
                </div>
            </div>
            <div className="flex mt-2 items-center gap-x-[5px]">
                <div className="flex-1 text-center text-sm border-[1px] rounded-[8px] border-[#0094FF] px-2 py-2">{formatDate}</div>
                <div className="flex-1 text-center text-sm text-[#FFFFFF] bg-[#0094FF] border-[1px] rounded-[8px] border-[#0094FF] px-2 py-2 hover:transition-transform hover:-translate-y-2 duration-300 cursor-pointer">
                    <button key={_id} onClick={() => handleUserClick ({ avatar, full_name, email, createdAt, inactive, _id:''})}>View Profile</button>
                </div>
            </div>
</div>
  )
}

export default UserCard