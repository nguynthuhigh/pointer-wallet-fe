import Home from './components/home/home'
import SignIn from './components/auth/sign-in'
import SignUp from './components/auth/sign-up'
import VerifyForm from './components/auth/verify-form';
import Dashboard from './components/dashboard/pages/dashboard';
import UpdateProfile from './components/auth/update-profile'
import { Routes,Route } from 'react-router-dom';
import PageNotFound from './components/pages/page-not-found';
import Payment from './components/dashboard/pages/payment';
import Developer from './components/developer/developer';
import PaymentGateway from './components/payment-gateway/payment-gateway'
import DemoPaymentGateway from './components/payment-gateway/demo'
import AddVoucher from './components/voucher/add-voucher';
import Success from './components/payment-gateway/success';
import WebHook from './components/webhook/webhook';
import Voucher from './components/voucher/voucher';
import EditVoucher from './components/voucher/edit-voucher'
import DownloadApp from './components/download-app/download-app';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/verify' element={<VerifyForm/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/history-payment' element={<Payment/>}/>
      <Route path='/update-profile' element={<UpdateProfile/>}/>
      <Route path='/docs' element={<Developer/>}/>
      <Route path='/payment-gateway' element={<PaymentGateway/>}/>
      <Route path='/demo' element={<DemoPaymentGateway/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/webhook' element={<WebHook/>}/>
      <Route path='/voucher' element={<Voucher/>}/>
      <Route path='/add-voucher' element={<AddVoucher/>}/>
      <Route path='/edit-voucher' element={<EditVoucher/>}/>
      <Route path='/download-app' element={<DownloadApp/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
