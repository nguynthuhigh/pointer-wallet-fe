import HeaderDefault from "../../components/header/header_default"

import QRCode from "react-qr-code"
const ReceivePage = () => {
  return (
    <div>
        <HeaderDefault></HeaderDefault>
        <div>
        <QRCode value={'123'}></QRCode>
        </div>
        <div>

        </div>
    </div>
  )
}

export default ReceivePage