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
import { LandingPage } from "./pages/landing-page"
import { SideBar1 } from "./components/sidebar/sidebar1"
function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false
      }
    }
  });
  return (
    <div className="">
      <QueryClientProvider client={queryClient}> 
      <BrowserRouter>

        {/* <SideBar1/> */}
        
        <Routes>

          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/login/dashboard" element={<DashBoard/>}/>
          
          
          <Route path="/customer-list" element = {<ListUser/>}/>
          <Route path="/customer-list/detail/:id" element = {<DetailListUser/>}/>


          <Route path="/voucher-list" element = {<VoucherList/>}/>
          <Route path="/voucher-list/detail/:id" element = {<VoucherDetail/>}/>


          <Route path="/partner-list" element = {<Partners/>}/>
          <Route path="/partner-list/detail/:id" element = {<PartnersDetail/>}/>

          <Route path="/transaction-list" element = {<TransactionsList/>}/>
          <Route path="/transaction-list/detail/:id" element = {<TransactionDetail/>}/>


          <Route path="/login" element ={<Login/>}/>
          <Route path="/landing-page" element = {<LandingPage/>}/>

        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
 
  )
}

export default App
