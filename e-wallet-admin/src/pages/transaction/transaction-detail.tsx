import { CardPartner } from "@/components/card/partner";
import { CardUser } from "@/components/card/user";
import { CardTransactionDetail } from "@/components/card/transaction-detail";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { useParams } from "react-router-dom";
import { ITransaction } from "@/interfaces/transaction";
import { HeaderComponent } from "@/components/header/header";
import {motion} from 'framer-motion'
export const TransactionDetail = () => {
  const { id } = useParams()
  const getNameID = (cus: ITransaction) => {
    if (cus.sender?.full_name)
      return cus.sender.full_name
    return `U${cus._id.slice(-4)}`
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transaction-detail', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/admin/get-transaction/details`, {
        params: {
          id: id
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
      <div className="flex-1 overflow-auto h-screen">
        <HeaderComponent title="Transaction Detail" />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <motion.div 
              initial = {{opacity:0, y:20}}
              animate = {{opacity:1, y:0}}
              transition={{duration:1}}
              className="bg-gray-800 bg-opacity-70 border border-gray-700 p-4 ">
            <div className="flex flex-col gap-y-[30px]">
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
          </motion.div>
        </main>
      </div>
    </>
  )
}

