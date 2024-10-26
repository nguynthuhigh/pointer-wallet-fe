import QRCode from "react-qr-code";
export const Qrcode = () => {

    return (
        <div className='bg-gray-50 h-screen flex items-center justify-center'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 '>
            <div id='Payment' className='space-y-[30px] mt-6'>
                
                <div id="Pay" className = 'space-y-3' >
                <div id="Logo" className="flex items-center space-x-2 ">
                    <div id="Photo" className='bg-black size-[60px]'></div>
                    <div id="Name" className='text-lg'>Powder</div>
                </div>
                    <div id="Title" className='text-[#0094FF] text-lg'>Thanh toan hoa don </div>
                </div>
                <div className='border-[1px] rounded-lg px-6 py-3 space-y-[20px]'>
                <div className='space-y-[20px] max-h-[500px] overflow-auto '>
                    <div className='grid grid-cols-[120px_1fr_100px_170px] font-bold sticky top-0 bg-gray-50'>
                        <p>Product</p>
                        <p className='min-w-[70px]'>Name</p>
                        <p className='text-center'>Quantity</p>
                        <p className='text-center'>Price</p>
                    </div>
                    <div className='grid grid-cols-[120px_1fr_100px_170px] border-b pb-3'>
                            <div className='bg-black size-[60px]'><img src="" alt="" /></div>
                            <div id="Name" className='flex-wrap min-w-[70px]'>
                                Pu with a very long product name 
                            </div>
                            <div id="quantity" className='text-center'>1</div>
                            <div id='amount' className='text-center text-lg text-[#0094FF]'>100.000</div>
                    </div>
                    


                    
                </div>
                <div id="total" className='flex justify-between'>
                    <div id="name" className='text-2xl font-bold'>Total</div>
                    <div id="price" className='text-2xl font-bold pr-4'>$134</div>
                </div>
                </div>
            </div>
            <div id="QR-code" className='flex flex-col justify-center items-center space-y-[20px]'>
                <p className='text-3xl'>Quét mã QR để thanh toán</p>
                <div className='flex justify-center'>
                <QRCode value='MaGiaoDich' />
                </div>
                <p className='text-2xl text-center'>Sử dụng App PressPay hoặc Camera để quét mã </p>
                <div className='flex justify-center space-x-1'>
                <p>Bạn chưa có ứng dụng?</p>
                <u className='text-[#0094FF]'>Tải ngay</u>
                </div>
                <button className='border-[1px] rounded-[4px] bg-[#0094FF] text-white w-[400px] py-3 px-6 '>Pay With Pointer Wallet</button>
            </div>

        </div>
        </div>
    )

}

