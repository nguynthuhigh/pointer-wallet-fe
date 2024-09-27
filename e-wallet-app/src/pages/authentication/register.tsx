import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AuthImg from "../../assets/png/auth_img.png";
import InputText from "../../components/authentication/input_text";
import { ButtonSubmit } from "../../components/authentication/button_submit";
import { registerUsers } from "../../redux/auth/authThunk";
import { AppDispatch, RootState } from "../../redux/store";
import { validatePassword } from "../../utils/validate-password";
import { clearMessage, clearError } from "../../redux/auth/authSlice";

interface User {
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching, error, registerUser } = useSelector(
    (state: RootState) => state.auth.register
  );
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError("register"));
    }
  }, [error]);

  useEffect(() => {
    if (registerUser.message) {
      toast.success(registerUser.message);
      dispatch(clearMessage("register"));
    }
  }, [registerUser.message]);

  const handleRegistration = async (data: FieldValues) => {
    try {
      const user: User = {
        email: data.email,
        password: data.password,
      };
      await dispatch(registerUsers({ user, navigate }));
      reset();
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình đăng ký!");
    }
  };

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError("email", {
        type: "manual",
        message: "Email không hợp lệ.",
      });
      toast.error("Email không hợp lệ.");
      return;
    }
    await handleRegistration(data);
  };

  return (
    <div className={`h-screen w-screen bg-gray-50`}>
      <div className="container-auth">
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
            isFetching={isFetching}
          />

          <InputText
            error={errors.password?.message}
            register={register}
            name="password"
            type="password"
            title="Mật khẩu"
            placeholder="Nhập mật khẩu"
            isFetching={isFetching}
          />

          <InputText
            error={errors.confirmPassword?.message}
            register={register}
            name="confirmPassword"
            type="password"
            title="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            isFetching={isFetching}
          />

          <ButtonSubmit title="Đăng ký" isLoading={isFetching} />
        </form>
        <h1 className="text-center font-semibold">
          Bạn đã có tài khoản?{" "}
          <Link to="/auth/login" className="font-semibold text-blue-default">
            Đăng nhập
          </Link>
        </h1>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
