import Welcome from './welcome'
import Header from '../header/header'
import Footer from '../footer/footer'
import CountDownPage from './countdown'
import { useEffect } from 'react'
export default function Home(){
    useEffect(()=>{
      document.title = 'pressPay - Home'
    },[])
    return (<div className="">
        <Header/>
        <Welcome></Welcome>
        <CountDownPage/>
        <Footer/>
    </div>)
}