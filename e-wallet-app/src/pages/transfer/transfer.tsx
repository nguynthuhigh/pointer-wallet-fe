import { ItemCurrency } from "../../components/home/item_currency"
import VNDIcon from '../../assets/png/vnd_icon.png'
import Steps from "rc-steps"
const Transfer = () => {
  return (
    <>
    <Steps>
        <Steps.Step title="first" />
        <Steps.Step title="second" />
        <Steps.Step title="third" />
    </Steps>
    <div>1</div>
    {/* <ItemCurrency image={VNDIcon} item={walletData?.currencies[0]} symbol={'VND'} name="Vietnamese Dong"></ItemCurrency>
    <ItemCurrency image={USDIcon} item={walletData?.currencies[1]} symbol={'USD'} name="US Dollar"></ItemCurrency>
    <ItemCurrency image={ETHIcon} item={walletData?.currencies[2]} symbol={'ETH'} name="Ethereum"></ItemCurrency> */}
    </>
  )
}

export default Transfer