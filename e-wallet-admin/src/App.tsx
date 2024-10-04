import {BrowserRouter, Route,Routes } from "react-router-dom"
import DashBoard from "./pages/dashboard"
import ListUser from "./pages/Users/UserList"
import Partners from "./pages/Partners/PartnerList"
import DetailListUser from "./pages/Users/UserDetail"
import Login from "./pages/login"
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import PartnersDetail from "./pages/Partners/PartnerDetail"
import { VoucherDetail } from "./pages/Vouchers/VoucherDetail"
import { VoucherList } from "./pages/Vouchers/VoucherList"
import { TransactionsList } from "./pages/Transactions/TransactionsList"
import { TransactionDetail } from "./pages/Transactions/TransactionDetail"
function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false
      }
    }
  });
  return (
    <div className="font-inter container mx-auto">
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/LoginAdmin/dashboard" element={<DashBoard/>}/>
          
          
          <Route path="/listUser" element = {<ListUser/>}/>
          <Route path="/listUser/detailListUser/:id" element = {<DetailListUser/>}/>


          <Route path="/listVoucher" element = {<VoucherList/>}/>
          <Route path="/listVoucher/detailVoucher/:id" element = {<VoucherDetail/>}/>


          <Route path="/listPartner" element = {<Partners/>}/>
          <Route path="/listPartner/detailListPartner/:id" element = {<PartnersDetail/>}/>

          <Route path="/listTransaction" element = {<TransactionsList/>}/>
          <Route path="/listTransaction/detailTransaction/:id" element = {<TransactionDetail/>}/>


          <Route path="/LoginAdmin" element ={<Login/>}/>


        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
 
  )
}

export default App
