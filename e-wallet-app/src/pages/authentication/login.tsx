import { useState } from "preact/hooks";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AuthImg from "../../assets/png/auth_img.png";
import InputText from "../../components/authentication/input_text";
import { ButtonSubmit } from "../../components/authentication/button_submit";
import { loginAPI } from "../../services/api/auth.api";
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorValue, setErrorValue] = useState<ErrorValue>({
    email: null,
    password: null,
  });
  type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
  };
  type ErrorValue = {
    email: string | null;
    password: string | null;
  };
  const handleInputChange = (event: HTMLElementEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prevFormData) => {
      setErrorValue({ email: null, password: null });
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      return updatedFormData;
    });
  };
  type ErrorResponse = {
    response: {
      data: {
        message: string;
      };
    };
  };
  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginAPI(loginData);
      if (response.status === 200) {
        navigate("/auth/verify-login", {
          state: { loginData, message: response.data.message },
        });
      }
    } catch (error: unknown) {
      const typeError = error as ErrorResponse;
      setErrorValue({
        email: typeError.response.data.message,
        password: typeError.response.data.message,
      });
      setIsLoading(false);
    }
  };
  errorValue.email ? toast.error(errorValue.email) : null;

  return (
    <div class={`bg-white p-4`}>
      <img class={`mx-auto mt-10 w-52`} src={AuthImg}></img>
      <h1 class={`text-center font-semibold text-2xl mt-5`}>
        Thông tin đăng nhập
      </h1>
      <h1
        class={`text-center font-inter font-semibold text-blue-default text-sm my-2 `}
      >
        Chào mừng bạn trở lại!
      </h1>
      <form onSubmit={handleLogin}>
        <InputText
          error={errorValue.email}
          onChange={handleInputChange}
          type="text"
          title="Email"
          name="email"
          placeholder="Nhập email hoặc username"
        ></InputText>
        <InputText
          error={errorValue.password}
          onChange={handleInputChange}
          type="password"
          title="Mật khẩu"
          name="password"
          placeholder="Nhập mật khẩu"
        ></InputText>
        <ButtonSubmit title="Đăng nhập" isLoading={isLoading} />
      </form>
      <h1 class={`text-center font-semibold`}>
        Bạn chưa có tài khoản?{" "}
        <Link to={`/auth/register`} class={`font-semibold text-blue-default`}>
          Đăng ký
        </Link>
      </h1>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;
