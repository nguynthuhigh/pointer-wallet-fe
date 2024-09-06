import { ItemCurrencyLoading, ItemCurrency } from "./item_currency";
import VNDIcon from "../../assets/png/vnd_icon.png";
import USDIcon from "../../assets/png//usd_icon.png";
import ETHIcon from "../../assets/png//eth_icon.png";
const Assets = ({ ...props }) => {
  const walletData = props.walletData;
  return (
    <div class={``}>
      <h1 className="mt-2 font-semibold text-sm">Tài sản</h1>
      {props.isLoading ? (
        <>
          <ItemCurrencyLoading />
          <ItemCurrencyLoading />
          <ItemCurrencyLoading />
        </>
      ) : (
        <>
          <ItemCurrency
            image={VNDIcon}
            item={walletData?.currencies[0]}
            symbol="VND"
            name="Vietnamese Dong"
          />
          <ItemCurrency
            image={USDIcon}
            item={walletData?.currencies[1]}
            symbol="USD"
            name="US Dollar"
          />
          <ItemCurrency
            image={ETHIcon}
            item={walletData?.currencies[2]}
            symbol="ETH"
            name="Ethereum"
          />
        </>
      )}
    </div>
  );
};

export default Assets;
