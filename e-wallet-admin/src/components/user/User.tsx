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

export type listUsers = Pick<UserProps,'_id' | 'full_name' | 'email' | 'createdAt' | 'inactive' | 'avatar'>[]
 
    
const UserRow: React.FC<UserProps> = ({_id, avatar, full_name, email, createdAt, inactive }) => {
    const navigate = useNavigate();

    const handleUserClick = (user: UserProps) => {
        const { avatar, full_name, email, createdAt, inactive } = user;
        navigate(`/listUser/detailListUser/${_id}`, { state: { avatar, full_name, email, createdAt, inactive } });
    };
    const formatDate = new Date(createdAt).toISOString().split('T')[0];
    return (
        <>  
            {/* Screen Lg */}
            <tr className="hidden lg:table-row cursor-pointer border-t-2 hover:bg-gray-200 whitespace-nowrap" >
                <td className="pl-4 h-[50px] box-border whitespace-nowrap">
                    <div className=" h-full w-full flex items-center">
                        {avatar ? (
                            <img src={avatar} className="rounded-full h-[40px] w-[40px] object-cover" />
                        ) : (
                            <img src={AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover" />
                        )}
                    </div>
                </td>
                <td className="pl-4 h-[50px] text-sm font-poppins whitespace-nowrap ">
                    {full_name}
                </td>
                <td className="pl-4 h-[50px] text-sm whitespace-nowrap  ">
                    {email}
                </td>
                <td className="pl-4 h-[50px] text-sm whitespace-nowrap">
                    {formatDate}
                </td>
                <td className="pl-4 h-[50px] whitespace-nowrap ">
                    <div className={`w-fit ${!inactive ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] px-[8px] rounded-[16px] flex items-center`}>
                        <GoDotFill className="ml-[6px] mr-[4px]" />
                        <div className="mr-[8px] text-sm font-semibold">
                            {!inactive ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                </td>
                <td className="pl-4 h-[50px] whitespace-nowrap text-[#0094FF] font-semibold hover:transition-transform hover:-translate-y-2 duration-300 ">
                    <button key={_id} onClick={() => handleUserClick({ avatar, full_name, email, createdAt, inactive, _id:''})}>View Profile</button>
                </td>
            </tr>

            {/* Card Layout (Sm,MD Screen) */}
           
        </>

    );
}


export default UserRow;
