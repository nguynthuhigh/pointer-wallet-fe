import {BrowserRouter, Route,Routes } from "react-router-dom"
import DashBoard from "./pages/dashboard"
import ListUser from "./pages/customer/customer-list"
import Partners from "./pages/partner/partner-list"
import DetailListUser from "./pages/customer/customer-detail"
import Login from "./pages/login"
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import PartnersDetail from "./pages/partner/partner-detail"
import { VoucherDetail } from "./pages/voucher/voucher-detail"
import { VoucherList } from "./pages/voucher/voucher-list"
import { TransactionsList } from "./pages/transaction/transaction-list"
import { TransactionDetail } from "./pages/transaction/transaction-detail"
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
          
          
          <Route path="/customer-list" element = {<ListUser/>}/>
          <Route path="/customer-list/detail/:id" element = {<DetailListUser/>}/>


          <Route path="/voucher-list" element = {<VoucherList/>}/>
          <Route path="/voucher-list/detail/:id" element = {<VoucherDetail/>}/>


          <Route path="/partner-list" element = {<Partners/>}/>
          <Route path="/partner-list/detail/:id" element = {<PartnersDetail/>}/>

          <Route path="/transaction-list" element = {<TransactionsList/>}/>
          <Route path="/transaction-list/detail/:id" element = {<TransactionDetail/>}/>


          <Route path="/LoginAdmin" element ={<Login/>}/>

        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
 
  )
}

export default App
