import React, { useState } from "react";
import InputText from "./input_text";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services/api/setting.api";
import CloseIcon from "../../assets/svg/plus.svg";
type FormData = {
  old_password: string;
  new_password: string;
  confirmNewPassword: string;
};
interface ChangePasswordProps {
  handleOpenModal: (field: string) => void;
}
const initialData = {
  old_password: "",
  new_password: "",
  confirmNewPassword: "",
};
const ChangePassword: React.FC<ChangePasswordProps> = ({ handleOpenModal }) => {
  const [formData, setFromData] = useState<FormData>(initialData);
  const [error, setError] = useState<string>();
  const handleInputChange = (field: string, value: string) => {
    if (field === "confirmNewPassword") {
      if (formData.new_password !== value) {
        setError("Mật khẩu mới không khớp");
      } else {
        setError("");
      }
    }
    setFromData((prevData) => ({ ...prevData, [field]: value }));
  };
  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      await changePassword(formData);
    },
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công");
      handleOpenModal("password");
      return setFromData(initialData);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (
      !formData.new_password ||
      !formData.old_password ||
      !formData.confirmNewPassword
    ) {
      return toast.error("Vui lòng nhập mật khẩu");
    }
    if (error) {
      return toast.error("Mật khẩu không khớp vui lòng nhập lại");
    }
    mutate(formData);
  };
  return (
    <div
      class={`bg-white p-4 border rounded-3xl font-semibold w-full max-w-2xl`}
    >
      <div class={`flex `}>
        <div>
          <h1 class={`text-xl`}>Đổi mật khẩu</h1>
          <h1 class={`text-gray-400`}>
            Mật khẩu của bạn phải có tối thiểu 8 ký tự, đồng thời bao gồm cả chữ
            số, chữ cái và ký tự đặc biệt (!$@%).
          </h1>
        </div>
        <button
          onClick={() => {
            handleOpenModal("password");
          }}
          class={`bg-gray-200 w-fit h-fit p-1 ml-2 rounded-full`}
        >
          <img class="rotate-45 " src={CloseIcon}></img>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <InputText
          name="Mật khẩu cũ"
          field="old_password"
          value={formData.old_password}
          onChange={handleInputChange}
          disable={false}
          type="password"
          maxLength={20}
        />
        <InputText
          name="Mật khẩu mới"
          field="new_password"
          value={formData.new_password}
          onChange={handleInputChange}
          disable={false}
          type="password"
          maxLength={20}
        />
        <h1 class={`font-semibold text-red-500`}>{error}</h1>
        <InputText
          name="Xác nhận mật khẩu mới"
          field="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
          disable={false}
          type="password"
          maxLength={20}
        />
        <div class={`my-2 w-full`}>
          <button
            type={"submit"}
            class={`w-full font-semibold text-sm transition-colors duration-500 ease-in-out bg-blue-default hover:bg-blue-600 text-white p-3 rounded-full`}
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
