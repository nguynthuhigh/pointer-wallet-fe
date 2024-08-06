import AuthImg from '../../assets/png/auth_img.png'
import InputText from '../../components/authentication/input_text'
import { ButtonSubmit } from '../../components/authentication/button_submit'
import { Link } from 'react-router-dom'
import { useState } from 'preact/hooks'
import {loginAPI} from '../../services/api/auth.api'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const nagivate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const [loginData,setLoginData] = useState({email:'',password:''})
  const [errorValue,setErrorValue] = useState<ErrorValue>({email:null,password:null})
  type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
  };
  type ErrorValue = {
    email: string | null;
    password: string | null;
  }
  const handleInputChange = (
    event: HTMLElementEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
  
    setLoginData((prevFormData) => {
      setErrorValue({email:null,password:null})
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      return updatedFormData;
    });
  };
  type ErrorReponse = {
    response:{
      data:{
        message:string
      }
    }
  }
  const handleLogin =async(e:Event)=>{
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await loginAPI(loginData)
      if(response.status === 200){
        nagivate('/auth/verify-login',{state:{loginData}})
      }
    } catch (error:unknown) {
      const typeError = error as ErrorReponse
      setErrorValue({email:typeError.response.data.message,password:typeError.response.data.message})
      setIsLoading(false)
    }
  }
  return (
    <div class={`bg-white p-4`}>
        <img class={`mx-auto mt-10 w-52`} src={AuthImg}></img>
        <h1 class={`text-center font-semibold text-2xl my-5`}>Thông tin đăng nhập</h1>
        <h1 class={`text-center font-inter text-sm my-2`}>Chào mừng bạn trở lại!</h1>
        <form onSubmit={handleLogin}>
          <InputText error={errorValue.email} onChange={handleInputChange} type="text" title="Email" name="email" placeholder="Nhập email hoặc username"></InputText>
          <InputText error={errorValue.password} onChange={handleInputChange} type="password" title="Mật khẩu"name="password" placeholder="Nhập mật khẩu"></InputText>
          <h1 class={`text-center font-semibold text-red-500`}>{errorValue.email}</h1>
          <ButtonSubmit isLoading={isLoading}></ButtonSubmit>
        </form>
        <h1 class={`text-center font-semibold`}>Bạn chưa có tài khoản? <Link to={`auth/sign-up`} class={`font-semibold text-blue-default`}>Đăng ký</Link></h1>
    </div>
  )
}

export default Login