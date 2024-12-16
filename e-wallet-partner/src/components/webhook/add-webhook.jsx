import { useState } from "react";
import { addWebhook, deleteWebhook, getWebHook } from "../../api/webhook.api";
import { Trash2,LoaderCircle } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from 'antd';
import toast from "react-hot-toast";
export default function AddWebHook() {
  const [isEvent, setIsEvent] = useState('payment.succeeded')
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Confirm delete ?');
  const [isInput, setIsInput] = useState('')
  const queryClient = useQueryClient();
  const [loadingBtn,setLoadingBtn] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (id) => {
    setModalText('The endpoint will delete after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    mutationDelete.mutate(id)
    toast.success('Delete successful')
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleInput = (e) => {
    setIsInput(e.target.value)
  }
  const handleOption = (e) => {
    setIsEvent(e.target.value);
  }
  const notifySuccess = () => toast.success('Add endpoint successful')
  const notifyFail = () => toast.error('Add endpoint fail')
  const notify = () => toast.error('Invalid endpoint')
  const handleSubmit = () => {
    if (!isInput) {
      notify();
    }
    else {
      setLoadingBtn(true);
      setTimeout(() => {
        mutationAdd.mutate();
        setLoadingBtn(false);
      },2000)
    }
  }
  const mutationAdd = useMutation({
    mutationKey: ['mutation-add-endpoint'],
    mutationFn: () => addWebhook({
      url: isInput,
      event: isEvent,
      partner: 'Partner'
    }),
    onSuccess: () => {
      notifySuccess();
      queryClient.invalidateQueries(['mutation-add-endpoint'])
    },
    onError: () => {
      notifyFail();
    }
  })
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-endpoint'],
    queryFn: () => getWebHook()
  })
  const mutationDelete = useMutation({
    mutationKey: ['mutation-delete-endpoint'],
    mutationFn: (id) => deleteWebhook(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['mutation-delete-endpoint']);
    }
  })
  console.log(data)
  if (isLoading) return 'Loading...'
  if (isError) return 'Fetching data error'
  return (
    <>
      <div className='space-y-4'>
        <div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                for="first_name"
                className="text-[16px] font-medium text-blue-500 dark:text-white"
              >
                Register endpoint
              </label>
              <input
                type="text"
                value={isInput}
                onChange={handleInput}
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-[6px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="http://your.domain.com/hello-world"
                required
              />
            </div>
            <div className="space-y-2">
              <p className="text-[16px] font-medium text-blue-500">Choose payment event</p>
              <select
                className="w-full rounded-[6px] bg-gray-50 border-[1px] border-gray-300 text-black"
                value={isEvent}
                onChange={handleOption}
              >
                <option value='payment.succeeded'>
                  Payment
                </option>
                <option value='payment.refund'>
                  Refund
                </option>
                <option value='wallet.connect'>
                  Wallet Connect
                </option>
              </select>
            </div>
            <div 
              onClick={handleSubmit}
              className="mx-auto w-[100px] bg-blue-500 font-medium text-white px-5 py-2 rounded-[6px] cursor-pointer hover:bg-blue-400 active:opacity-70 ">
               {
                loadingBtn ? <LoaderCircle className='size-6 mx-auto animate-spin w-full '/> : 'Register'
               }
            </div>
          </div>
        </div>
        <div className='border-[1px] rounded-[6px] py-4 px-6 bg-gray-50 shadow-sm border-gray-300'>
          <p className='font-medium text-blue-500 text-xl py-3 '>Table List</p>
          <table className='table-auto w-full'>
            <thead>
              <tr className="grid grid-cols-[100px_1fr_200px_80px] text-gray-600 text-sm uppercase border-b">
                <th className='p-4 text-left'>#</th>
                <th className='p-4 text-left'>Endpoint</th>
                <th className='p-4 text-left'>Event</th>
                <th className='p-4 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((item, index) => (
                <tr key={index} className="grid grid-cols-[100px_1fr_200px_80px] border-t border-gray-300 text-sm text-black items-center">
                  <td className='p-4'>{index + 1}</td>
                  <td className='p-4'>{item.url}</td>
                  <td className='p-4'>{item.event}</td>
                  <td className='p-4 flex justify-center'>
                    <Trash2
                      onClick={showModal}
                      size={20}
                      className='text-[#FF1717] cursor-pointer'
                    />
                    <Modal
                      title='Delete endpoint'
                      open={open}
                      onOk={() => handleOk(item._id)}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                      centered={true}
                      okText='Delete'
                      okButtonProps={{
                        style: {
                          backgroundColor: '#3362FC',
                        }
                      }}
                    >
                      <p>{modalText}</p>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}