import {BrowserRouter, Route,Routes } from "react-router-dom"
import Home from "./pages/test"
import DashBoard from "./pages/dashboard"
function App() {

  return (
    <div className="font-inter">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Home></Home>}/>
          <Route path="/dashboard" element={<DashBoard></DashBoard>}/>
        </Routes>
      </BrowserRouter>
    </div>
 
  )
}

export default App
