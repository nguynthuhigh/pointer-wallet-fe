import HeaderDefault from "../../components/header/header_default";
import AvatarDefault from '../../assets/png/default_avatar.png'
import { Modal } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { disconnectWallet, getConnectedAppWallet } from "../../services/api/connect-app.api";
import toast, { Toaster } from "react-hot-toast";

export const ConnectAppList:React.FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Bạn có chắc là hủy liên kết không ?');
    const queryClient = useQueryClient();
    const [selectId,setSelectId] = useState<string | ''>('')
    const showModal = (id:string) => {
        setOpen(true);
        setSelectId(id)
    };
    const notifySuccess = () => toast.success('Hủy đối tác thành công!')

    const handleOk = () => {
        setModalText('Hủy liên kết sẽ hủy sau 2 giây');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
        mutationDelete.mutate(selectId);
     
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const { data, isLoading, isError } = useQuery({
        queryKey: ['get-connect-app'],
        queryFn: () => getConnectedAppWallet()
    })
    console.log(data)
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Fetching data error</p>

    const mutationDelete = useMutation({
        mutationKey: ['disconnect-wallet'],
        mutationFn: (id:string) => disconnectWallet({partnerId: id}),
        onSuccess: () => {
            notifySuccess();
            queryClient.invalidateQueries({queryKey: ['get-connect-app']})
    }})
    return (
        <>
            <div class={`container-center`}>
                <HeaderDefault title='Danh sách app liên kết ví' />
                <div className='space-y-5'>
                    {data?.map((item: any) => (
                        <div key={item._id} className='grid grid-cols-[90px_1fr_150px] items-center text-black'>
                            <img src={item.partnerID.image || AvatarDefault} className='size-[60px] rounded-full' />
                            <div>
                                <p className='font-bold'>{item.partnerID.name || 'Cập nhật tên đối tác!'}</p>
                                <p className='text-gray-500'>{item.partnerID.description || 'Không có mô tả'}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => showModal(item.partnerID._id)}
                                    className='bg-red-500 text-white px-5 py-2 rounded-full'>
                                    Hủy liên kết
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <Modal
                title='Hủy liên kết'
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                centered={true}
            >
                <p>{modalText}</p>
            </Modal>
            <Toaster/>
        </>
    )
}