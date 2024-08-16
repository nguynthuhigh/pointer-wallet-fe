import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import History from "./pages/transaction/history";
import TransactionDetails from "./pages/transaction/details";
import ReceivePage from "./pages/receive/receive";
import Login from "./pages/authentication/login";
import Loading from "./pages/loading";
import PageNotFound from "./pages/page_not_found";
import VerifyLogin from "./pages/authentication/verify_login";
import ScanQR from "./pages/payment/scanqr";
import { PaymentGateway } from "./pages/payment/payment";
import Transfer from "./pages/transfer/transfer";
import Register from "./pages/authentication/register";
import VerifyRegister from "./pages/authentication/verify_register";
import SecurityCode from "./pages/authentication/setup_security_code";
export function App() {
  return (
    <Router>
      <div className="font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/scan-qrcode" element={<ScanQR />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transaction/history" element={<History />} />
          <Route path="/transaction/details" element={<TransactionDetails />} />
          <Route path="/receive-page" element={<ReceivePage />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/verify-login" element={<VerifyLogin />} />
          <Route path="/auth/verify-register" element={<VerifyRegister />} />
          <Route path="/auth/security-code" element={<SecurityCode />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
