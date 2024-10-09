import { ICardVoucher } from '@/interface/card-voucher'
import logoPressPay from '../../assets/png/logo_presspay.png'
export const CardVoucher = ({title,content,quantity,usedcount,code}: ICardVoucher) => {
    return (
        <>
            <div className=" px-4 py-4 border-[1px] w-[380px] bg-white backdrop-filter backdrop-blur-lg rounded-[16px] flex justify-between shadow-[4px_4px_4px_rgba(0,0,0,0.10)]">
                <div id="CardVoucher">
                    <div className="flex items-center justify-between h-full">
                        <div className="flex flex-col w-[350px] h-full justify-between gap-y-[10px]">
                            <div className="flex justify-between items-center">
                                <div id='Logo'><img src={logoPressPay} className="size-[40px]" /></div>
                                <div id="Free" className="w-[65px] h-[30px] text-md flex justify-center items-center border-[1px] border-[#45A55B] rounded-[16px] bg-[#45A55B] text-white">Free</div>
                            </div>
                            <div>
                                <div id="Title" className="text-sm font-semibold text-[#000000]">
                                    {title}
                                </div>
                                <div id="Content" className="text-lg font-bold text-[#0094FF]">
                                    {content}
                                </div>
                            </div>
                            <div className="flex justify-between text-lg">
                                <div id="Quantity" className="flex flex-col">
                                    <div id="Name" className=" text-sm text-[#758694]">Quantity</div>
                                    <div id="Value" className="font-semibold">{quantity}</div>
                                </div>
                                <div id="UsedCount" className="flex flex-col text-lg">
                                    <div id="Name" className="text-sm text-[#758694]">Usedcount</div>
                                    <div id="Value" className="font-semibold">{usedcount}</div>
                                </div>
                                <div id="Code" className="flex flex-col">
                                    <div id="Name" className="text-sm text-[#758694]">Code</div>
                                    <div id="Value" className="uppercase font-semibold">{code}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}