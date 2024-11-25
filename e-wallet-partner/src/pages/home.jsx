import Welcome from "../components/home/welcome";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CountDownPage from "../components/home/countdown";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.title = "pressPay - Home";
  }, []);
  return (
    <div className="">
      <Header />
      <Welcome></Welcome>
      <CountDownPage />
      <Footer />
    </div>
  );
}
