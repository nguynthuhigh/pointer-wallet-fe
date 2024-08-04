import HeaderDefault from '../components/header/header_default'
import ItemTransaction from '../components/history_transaction/item_transaction'
import USDTIcon from '../assets/svg/usdt.svg'
import dataTransaction from '../dummy-data/transaction.json'
const HistoryTransactions = () => {
  return (
    <div>
        <HeaderDefault title="Lịch sử giao dịch"></HeaderDefault>
        {dataTransaction.data.transactions.map((item,key)=>(
            <ItemTransaction item={item} key={key} icon={USDTIcon}/>
        ))}
        

    </div>
  )
}

export default HistoryTransactions