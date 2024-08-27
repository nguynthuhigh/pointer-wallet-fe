import { FieldValues, useForm } from "react-hook-form";
import { useState } from "preact/hooks";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthImg from "../../assets/png/auth_img.png";
import InputText from "../../components/authentication/input_text";
import { ButtonSubmit } from "../../components/authentication/button_submit";
import { registerUser } from "../../redux/auth/authThunk";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
interface User {
  email: string;
  password: string;
}
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const registerData = useSelector((state: RootState) => state.auth.register);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Mật khẩu không khớp. Vui lòng thử lại!",
      });
      toast.error("Mật khẩu không khớp. Vui lòng thử lại!");
      return;
    }
    if (!validatePassword(data.password)) {
      setError("password", {
        type: "manual",
        message:
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.",
      });
      toast.error(
        "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt."
      );
      return;
    }

    setIsLoading(true);
    try {
      const user: User = {
        email: data.email,
        password: data.password,
      };
      await dispatch(registerUser({ user, navigate }));
      if (registerData.registerUser.message) {
        toast.success(registerData.registerUser.message);
      }
      reset();
    } catch (error) {
      console.log(error);
      toast.error(registerData.error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (registerData.error) {
      toast.error(registerData.error);
    }
  }, [registerData.error]);
  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasUppercase.test(password) &&
      hasLowercase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  return (
    <div className="bg-white p-4">
      <img className="mx-auto mt-10 w-52" src={AuthImg} alt="auth image" />
      <h1 className="text-center font-semibold text-2xl mt-5">
        Đăng ký tài khoản
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <InputText
          error={errors.email?.message}
          register={register}
          name="email"
          type="email"
          title="Email"
          placeholder="Nhập địa chỉ Email"
        />

        <InputText
          error={errors.password?.message}
          register={register}
          name="password"
          type="password"
          title="Mật khẩu"
          placeholder="Nhập mật khẩu"
        />

        <InputText
          error={errors.confirmPassword?.message}
          register={register}
          name="confirmPassword"
          type="password"
          title="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
        />

        <ButtonSubmit title="Đăng ký" isLoading={isLoading} />
      </form>
      <h1 className="text-center font-semibold">
        Bạn đã có tài khoản?{" "}
        <Link to="/auth/login" className="font-semibold text-blue-default">
          Đăng nhập
        </Link>
      </h1>
      <Toaster position="top-right" />
    </div>
  );
}
