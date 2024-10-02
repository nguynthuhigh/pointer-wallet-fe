import {BrowserRouter, Route,Routes } from "react-router-dom"
import DashBoard from "./pages/dashboard"
import ListUser from "./pages/Users/listUser"
import Vouchers from "./pages/vouchers"
import Partners from "./pages/Partners/partners"
import DetailListUser from "./pages/Users/detailListUser"
import Login from "./pages/login"
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import PartnersDetail from "./pages/Partners/partnersDetail"
import { VoucherDetail } from "./pages/voucherDetail"
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


          <Route path="/listVoucher" element = {<Vouchers/>}/>
          <Route path="/listVoucher/detailVoucher/:id" element = {<VoucherDetail/>}/>


          <Route path="/listPartner" element = {<Partners/>}/>
          <Route path="/listPartner/detailListPartner/:id" element = {<PartnersDetail/>}/>


          <Route path="/LoginAdmin" element ={<Login/>}/>


        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
 
  )
}

export default App
