import QRCode from "react-qr-code"
import Header from '../header/header'
export default function DownloadApp(){
    return(<div>
        <Header color={true}></Header>
        <div className="w-fit pt-28 mx-auto">
            <QRCode className="w-fit mx-auto" value="https://expo.dev/artifacts/eas/pqca4JoDravvBXpHhjE4pt.apk"> </QRCode>
            <h1 className="font-semibold text-xl">Scan to download the android app or  <a className="hover:text-blue-400 text-blue-300" href="https://expo.dev/artifacts/eas/pqca4JoDravvBXpHhjE4pt.apk">here</a></h1>
        </div>
    </div>)
}