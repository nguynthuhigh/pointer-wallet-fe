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
import CreditCard from "./pages/credit-card";
import Setting from "./pages/setting";
import SideBar from "./components/sidebar/sidebar";
import Header from "./components/header/header";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="font-inter bg-gray-50 h-screen flex w-full">
        <SideBar state="Trang chủ" />
        <Routes>
          <Route element={<ProtectRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/setting" element={<Setting />} />

            <Route path="/scan-qrcode" element={<ScanQR />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/payment/results" element={<PaymentResults />} />

            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transfer/result" element={<TransferResults />} />

            <Route path="/transaction/history" element={<History />} />
            <Route
              path="/transaction/details"
              element={<TransactionDetails />}
            />

            <Route path="/deposit-withdraw" element={<DepositWithdraw />}>
              <Route path="deposit" element={<Deposit />} />
              <Route path="withdraw" element={<Withdraw />} />
            </Route>

            <Route path="/credit-card" element={<CreditCard />}>
              <Route path="add-card" element={<AddCreditCard />} />
            </Route>

            <Route path="/receive-page" element={<ReceivePage />} />
          </Route>

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/login/verify-login" element={<VerifyLogin />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/auth/register/verify-register"
            element={<VerifyRegister />}
          />
          <Route
            path="/auth/register/security-code"
            element={<SecurityCode />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
