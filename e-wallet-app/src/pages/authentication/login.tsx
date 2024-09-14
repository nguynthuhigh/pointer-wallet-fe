import { useState } from "preact/hooks";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import AuthImg from "../../assets/png/auth_img.png";
import InputText from "../../components/authentication/input_text";
import { ButtonSubmit } from "../../components/authentication/button_submit";
import { loginUsers } from "../../redux/auth/authThunk";
import { AppDispatch, RootState } from "../../redux/store";
import { clearError } from "../../redux/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching, error } = useSelector(
    (state: RootState) => state.auth.login
  );
  const [user, setUserData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
      setFormErrors(error);
      dispatch(clearError("login"));
    }
  }, [error]);

  type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
  };

  const handleInputChange = (event: HTMLElementEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Email không hợp lệ.");
      return;
    }
    await dispatch(loginUsers({ user, navigate }));
  };

  return (
    <div class="bg-white p-4 flex">
      <div class="w-full">
        <img class="mx-auto mt-10 w-52" src={AuthImg}></img>
        <h1 class="text-center font-semibold text-2xl mt-5">
          Thông tin đăng nhập
        </h1>
        <h1 class="text-center font-inter font-semibold text-blue-default text-sm my-2">
          Chào mừng bạn trở lại!
        </h1>
        <form onSubmit={handleLogin}>
          <InputText
            error={formErrors}
            onChange={handleInputChange}
            type="text"
            title="Email"
            name="email"
            placeholder="Nhập email hoặc username"
          />
          <InputText
            error={formErrors}
            onChange={handleInputChange}
            type="password"
            title="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu"
          />
          <ButtonSubmit title="Đăng nhập" isLoading={isFetching} />
        </form>
        <h1 class="text-center font-semibold">
          Bạn chưa có tài khoản?{" "}
          <Link to="/auth/register" class="font-semibold text-blue-default">
            Đăng ký
          </Link>
        </h1>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Login;
