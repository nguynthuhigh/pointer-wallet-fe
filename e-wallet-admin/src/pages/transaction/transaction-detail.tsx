import SideBar from "@/components/sidebar/sidebar"
import { CardPartner } from "@/components/card/partner";
import { CardUser } from "@/components/card/user";
import { CardTransactionDetail } from "@/components/card/transaction-detail";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { useParams } from "react-router-dom";
import { ITransaction } from "@/interfaces/transaction";

export const TransactionDetail = () => {
  const {id} = useParams()
  const getNameID = (cus: ITransaction) => {
    if (cus.sender?.full_name)
        return cus.sender.full_name
    return `U${cus._id.slice(-4)}`
}
  const {data,isLoading,isError} = useQuery({
    queryKey: ['transaction-detail',id], 
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/admin/get-transaction/details`,{
        params: {
          id:id
        }
      })
      return response.data.data
    }
  })
  console.log(data)
  if (isLoading) return "Loading ..."
  if (isError) return 'Fetching Data Error'
  return (
    <>
      <div className="flex">
        <SideBar state={'Transactions'} />
        <div className="w-full ml-[230px] flex flex-col gap-y-[30px] mt-[20px]">
          <p className="font-bold text-3xl ">Transaction Detail</p>
          <CardTransactionDetail
            _id={data._id}
            status={data.status}
            title={data.title}
            message={data.message}
            type={data.type}
            amount={data.amount}
          />
          <div className="flex flex-row gap-x-[40px]">
            {data.partnerID &&
            <CardPartner
              profileName='Profile Partner'
              id={data.partnerID._id}
              img={data.partnerID?.image}
              name={data.partnerID.name || getNameID(data.partnerID)}
              email={data.partnerID.email}
              date={data.createdAt}
            />
            }
            {data.sender && 
            <CardUser
              profileName='Profile Customer'
              id={data.sender._id}
              img={data.sender.avatar}
              name={data.sender.full_name || getNameID(data.sender)}
              email={data.sender.email}
              date={data.createdAt}
            />
            } 
            {data.receiver && 
            <CardUser
              profileName='Profile Customer'
              id={data.receiver._id}
              img={data.receiver.avatar}
              name={data.receiver.full_name || getNameID(data.receiver)}
              email={data.receiver.email}
              date={data.createdAt}
            />
            }
          </div>
        </div>
      </div>
    </>
  )
}

