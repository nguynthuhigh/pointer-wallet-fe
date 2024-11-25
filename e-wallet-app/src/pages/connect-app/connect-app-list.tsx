import HeaderDefault from "../../components/header/header_default";
import AvatarDefault from '../../assets/png/default_avatar.png'
import { Modal } from "antd";
import { useState } from "react";

export default function ConnectAppList() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Bạn có chắc là hủy liên kết không ?');

    const showModal = () => {
        setOpen(true);
      };

    const handleOk = () => {
        setModalText('Hủy liên kết sẽ hủy sau 2 giây');
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <div class={`container-center`}>
                <HeaderDefault title='Danh sách app liên kết ví' />
                <div className='space-y-5'>
                    <div className='grid grid-cols-[90px_1fr_150px] items-center text-black'>
                        <img src={AvatarDefault} className='size-[60px] rounded-full' />
                        <div>
                            <p className='font-bold'>Pointer Wallet</p>
                            <p className='text-gray-500'>https://pointerwallet.com</p>
                        </div>
                        <div>
                            <button 
                                onClick={showModal}
                                className='bg-red-500 text-white px-5 py-2 rounded-full'>
                                Hủy liên kết
                            </button>
                            <Modal 
                                title = 'Hủy liên kết'
                                open = {open}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                                centered = {true}
                            > 
                                <p>{modalText}</p>
                            </Modal>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}