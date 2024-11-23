import { useState } from "react";
import { LoadingButtonWebhook } from "../auth/loading";
import webhookAPI from "../../api/webhook.api";
import { Trash2 } from 'lucide-react'
import { GoDotFill } from "react-icons/go";
import { useQuery } from '@tanstack/react-query'
import axiosInstance from "../../configs/axios.config"
export default function AddWebHook() {
  const [isEvent, setIsEvent] = useState('payment.succeeded')

  const [isLoading, setIsLoading] = useState(false);
  const [webhookValue, setWebhookValue] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setError(null);
    setWebhookValue(e.target.value);
  };

  const handleOption = (e) => {
    setIsEvent(e.target.value);
  }
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (e) {
      return false;
    }
  };
  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (!isValidUrl(webhookValue)) {
        setError("Invalid URL");
        return;
      }
      const response = await webhookAPI.addWebhook({ endpoint: webhookValue, isEvent, partner: 'Partner' });
      if (response.status === 200) {
        setNotification("Webhook has been added successfully");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { data, Loading, isError } = useQuery({
    queryKey: 'get-endpoint',
    queryFn: async () => {
      const response = await axiosInstance.get('http://localhost:8888/api/v1/webhook')
      return response.data
      
    }
  })
  console.log(data)
  if (Loading) return 'Loading...'
  if (isError) return 'Fetching data error'
  return (
    <>
      <div className='space-y-4'>
        <div>
          <form onSubmit={handleRegister}>
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
                  onChange={handleChange}
                  value={webhookValue}
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-[6px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="http://your.domain.com/hello-world"
                  required
                />
              </div>
              <div className="space-y-2">
                <p className="text-[16px] font-medium text-blue-500">Choose payment method</p>
                <select
                  className="w-full rounded-[6px] bg-gray-50 border-[1px] border-gray-300 text-black"
                  value={isEvent}
                  onChange={handleOption}
                >
                  <option
                    value='payment.succeeded'
                  >
                    Payment
                  </option>
                  <option
                    value='payment.refund'
                  >
                    Refund
                  </option>
                </select>
              </div>
              <div className="text-green-400 mx-auto w-fit font-semibold">
                {notification}
              </div>
              <div className="text-red-500 mx-auto w-fit font-semibold text-sm">{error}</div>
              <div>
                {isLoading ? (
                  <LoadingButtonWebhook />
                ) : (
                  <button
                    type="submit"
                    className="text-center py-2 px-5 text-white flex items-center bg-blue-600 font-medium rounded-[6px] mx-auto"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className='border-[1px] rounded-[6px] py-3 px-6 bg-gray-50 shadow-sm border-gray-300'>
          <p className='font-medium text-blue-500 text-xl py-3 '>Table List</p>
          <table className='table-auto w-full'>
            <thead>
              <tr className="grid grid-cols-[100px_1fr_150px_80px] text-gray-600 text-sm uppercase">
                <th className='p-4 text-left'>#</th>
                <th className='p-4 text-left'>Endpoint</th>
                <th className='p-4 text-left'>Method</th>
                <th className='p-4 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="grid grid-cols-[100px_1fr_150px_80px] border-t border-gray-300 text-sm text-black items-center">
                  <td className='p-4'></td>
                  <td className='p-4'>{item.url}</td>
                  <td className='border-[#C11574] text-[#C11574] flex items-center justify-center rounded-full border-[3px] w-fit h-fit px-4 py-1 font-medium'>
                    <GoDotFill className=' mr-[4px]' />
                    Payment
                  </td>
                  <td className='p-4 flex justify-center '>
                    <Trash2 size={20} className='text-[#FF1717]' />
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
