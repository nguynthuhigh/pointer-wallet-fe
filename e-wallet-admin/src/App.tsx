import {BrowserRouter, Route,Routes } from "react-router-dom"
import DashBoard from "./pages/dashboard"
import ListUser from "./pages/listUser"
import Vouchers from "./pages/vouchers"
import Partners from "./pages/partners"
import DetailListUser from "./pages/detailListUser"
import Login from "./pages/login"
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false
      }
    }
  });
  return (
    <div className="font-poppins">
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/LoginAdmin/dashboard" element={<DashBoard/>}/>
          <Route path="/listUser" element = {<ListUser/>}/>
          <Route path="/listVoucher" element = {<Vouchers/>}/>
          <Route path="/listPartner" element = {<Partners/>}/>
          <Route path="/listUser/detailListUser/:id" element = {<DetailListUser/>}/>
          <Route path="/LoginAdmin" element ={<Login/>}/>

        </Routes>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </div>
 
  )
}

export default App
