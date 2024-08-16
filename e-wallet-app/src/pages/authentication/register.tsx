import { FieldValues, useForm } from "react-hook-form";
import { useState } from "preact/hooks";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../services/api/auth.api";
import AuthImg from "../../assets/png/auth_img.png";
import InputText from "../../components/authentication/input_text";
import { ButtonSubmit } from "../../components/authentication/button_submit";

export default function Register() {
  const navigation = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Mật khẩu không khớp. Vui lòng thử lại!");
    } else {
      setIsLoading(true);
      try {
        const response = await registerAPI(data);
        if (response.status === 200) {
          toast.success(response.data.message);
          setIsLoading(false);
          reset();
          navigation("/auth/verify-register", { state: data });
        }
      } catch (error) {
        toast.error("Tài khoản đã tồn tại");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-4">
      <img className="mx-auto mt-10 w-52" src={AuthImg} alt="auth image" />
      <h1 className="text-center font-semibold text-2xl mt-5">
        Đăng ký tài khoản
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <InputText
          register={register}
          name="email"
          type="email"
          title="Email"
          placeholder="Nhập địa chỉ Email"
        />
        <InputText
          register={register}
          name="password"
          type="password"
          title="Mật khẩu"
          placeholder="Nhập mật khẩu"
        />
        <InputText
          register={register}
          name="confirmPassword"
          type="password"
          title="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
        />

        <ButtonSubmit title="Đăng ký" isLoading={isLoading} />
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
