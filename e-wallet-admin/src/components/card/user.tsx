import { SiTicktick } from "react-icons/si"
import AvatarDefault from '../../assets/png/Avatar.png'
import { ICardUser } from "@/interface/card-user"
import { HiArrowNarrowRight } from "react-icons/hi"
import { formatDate } from "../transaction/TransactionHistory"
import { Link } from "react-router-dom"

export const CardUser = ({ id, profileName, img, name, email, date }: ICardUser) => {
    return (
        <>
            <div className=" border-[1px] relative w-[400px] h-[200px] rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                <div id="ViewPartner">
                    <div className="flex items-center justify-between h-full">
                        <div className="flex w-[350px] h-full gap-x-[10px] ">
                            <Link to={`/customer-list/detail/${id}`} className=" absolute right-[10px] cursor-pointer top-[20px] text-[#FFFFFF] border-[1px] p-2 border-[#0094FF] rounded-full bg-[#0094FF]">
                                <HiArrowNarrowRight className="size-[20px]" />
                            </Link>
                            <div id="AvatarPartner" className="flex justify-center border-r-[1px] my-6 items-center w-[120px]">
                                <div className="flex flex-col justify-center items-center gap-y-[20px]">
                                    <div className="text-[#0094FF] font-bold text-lg text-center">
                                        {profileName}
                                    </div>
                                    <div>
                                        {img 
                                        ? <img src={img} className="size-[70px] rounded-full object-cover"/> 
                                        : <img src={AvatarDefault} className="size-[70px] rounded-full object-cover" />}

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-y-[10px]">
                                <div className="flex items-end gap-x-[5px]">
                                    <div id="Name">
                                        <div id="Name" className="text-sm text-[#758694]">Name</div>
                                        <div id="Value" className="font-semibold text-md">{name}</div>
                                    </div>
                                    <div id="Status" className="flex items-center gap-x-[5px] text-[#45A55B]">
                                        <div id="Name"><SiTicktick /></div>
                                        <div id="Value">Active</div>
                                    </div>
                                </div>
                                <div id="Email">
                                    <div id="Name" className="text-sm text-[#758694]">Email</div>
                                    <div id="Value" className="font-semibold text-md">{email}</div>
                                </div>
                                <div className="flex items-center gap-x-[30px]">
                                    <div id="JoinDate">
                                        <div id="Name" className="text-sm text-[#758694]">Join</div>
                                        <div id="Value" className="font-semibold text-md">{formatDate(date)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}