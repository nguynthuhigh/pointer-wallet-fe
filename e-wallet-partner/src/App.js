import Home from "./components/home/home";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import VerifyForm from "./pages/auth/verify-form";
import UpdateProfile from "./pages/auth/update-profile";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/pages/page-not-found";
import TransactionHistory from "./pages/transaction-history";
import Developer from "./pages/developer";
import PaymentGateway from "./pages/payment/payment-gateway";
import DemoPaymentGateway from "./pages/payment/demo";
import Success from "./pages/payment/success";
import WebHook from "./pages/webhook";
import DownloadApp from "./pages/download-app";
import Dashboard from "./pages/dashboard";
import Voucher from "./pages/voucher/voucher";
import AddVoucher from "./pages/voucher/add-voucher";
import EditVoucher from "./pages/voucher/edit-voucher";
import Settings from "./pages/settings";
import CodePointer from "./pages/auth/code-pointer";
function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify" element={<VerifyForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/docs" element={<Developer />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
        <Route path="/demo" element={<DemoPaymentGateway />} />
        <Route path="/success" element={<Success />} />
        <Route path="/webhook" element={<WebHook />} />
        <Route path="/vouchers" element={<Voucher />} />
        <Route path="/add-voucher" element={<AddVoucher />} />
        <Route path="/edit-voucher" element={<EditVoucher />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/download-app" element={<DownloadApp />} />
        <Route path="/authorize" element={<CodePointer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
