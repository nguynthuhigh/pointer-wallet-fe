import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import History from "./pages/transaction/history";
import TransactionDetails from "./pages/transaction/details";
import ReceivePage from "./pages/receive/receive";
import Login from "./pages/authentication/login";
import PageNotFound from "./pages/page_not_found";
import VerifyLogin from "./pages/authentication/verify_login";
import ScanQR from "./pages/payment/scanqr";
import { PaymentGateway } from "./pages/payment/payment";
import Transfer from "./pages/transfer/transfer";
import Register from "./pages/authentication/register";
import VerifyRegister from "./pages/authentication/verify_register";
import SecurityCode from "./pages/authentication/setup_security_code";
import TransferResults from "./pages/transfer/transfer_results";
import ProtectRoutes from "./utils/protect_routes";
import DepositWithdraw from "./pages/deposit-withdraw";
import Deposit from "./pages/deposit-withdraw/deposit";
import Withdraw from "./pages/deposit-withdraw/withdraw";
import PaymentResults from "./pages/payment/payment_results";
import AddCreditCard from "./pages/credit-card/add-credit-card";

export function App() {
  return (
    <Router>
      <div className="font-inter bg-gray-50 h-[100vh]">
        <Routes>
          <Route element={<ProtectRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/scan-qrcode" element={<ScanQR />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/payment/results" element={<PaymentResults />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transaction/history" element={<History />} />
            <Route path="deposit-withdraw" element={<DepositWithdraw />}>
              <Route path="deposit" element={<Deposit />} />
              <Route path="withdraw" element={<Withdraw />} />
            </Route>
            <Route path="/credit-card/add-card" element={<AddCreditCard />} />
            <Route
              path="/transaction/details"
              element={<TransactionDetails />}
            />
            <Route path="/receive-page" element={<ReceivePage />} />
            <Route path="/transfer/result" element={<TransferResults />} />
          </Route>
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
