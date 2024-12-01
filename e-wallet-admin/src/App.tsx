import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import DashBoard from "./pages/dashboard"
import ListUser from "./pages/customer/customer-list"
import Partners from "./pages/partner/partner-list"
import DetailListUser from "./pages/customer/customer-detail"
import Login from "./pages/login"
import PartnersDetail from "./pages/partner/partner-detail"
import { VoucherDetail } from "./pages/voucher/voucher-detail"
import { VoucherList } from "./pages/voucher/voucher-list"
import { TransactionsList } from "./pages/transaction/transaction-list"
import { TransactionDetail } from "./pages/transaction/transaction-detail"
import { LandingPage } from "./pages/landing-page"
import { SideBar } from "./components/sidebar/sidebar"
import { Setting } from "./pages/setting"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./utils/protected-route"
const AuthenticatedLayout = () => {
  return (
    <>
      <div className="flex h-screen overflow-auto bg-gray-900 text-gray-100">
        <div className="fixed inset-0 -z-10">
          <div className=" absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-80"></div>
          <div className=" absolute inset-0 backdrop-blur-md"></div>
        </div>
        <SideBar />
        <Outlet />
      </div >
    </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to='login' />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />

            <Route path="/customer-list" element={<ListUser />} />
            <Route path="/partner-list" element={<Partners />} />
            <Route path="/transaction-list" element={<TransactionsList />} />
            <Route path="/voucher-list" element={<VoucherList />} />

            <Route path="/customer-list/detail/:id" element={<DetailListUser />} />
            <Route path="/partner-list/detail/:id" element={<PartnersDetail />} />
            <Route path="/voucher-list/detail/:id" element={<VoucherDetail />} />
            <Route path="/transaction-list/detail/:id" element={<TransactionDetail />} />

            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>


  );
}

export default App;
