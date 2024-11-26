import CashInIcon from "../assets/svg/cashin.svg";
import HistoryIcon from "../assets/svg/history_trans.svg";
import ScanIcon from "../assets/svg/scan-qr.svg";
import DepositWithdraw from "../assets/svg/depo.svg";

export const buttonFeatures = [
  { link: "/transfer", image: CashInIcon, title: "Gửi" },
  { link: "/receive-page", image: HistoryIcon, title: "Nhận" },
  { link: "/scan-qrcode", image: ScanIcon, title: "Quét mã" },
  { link: "/deposit-withdraw", image: DepositWithdraw, title: "Nạp/Rút" },
  { link: "/transaction/history", image: HistoryIcon, title: "Lịch sử" },
];
