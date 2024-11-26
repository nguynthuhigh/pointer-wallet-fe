import React, { useState } from "react";
import InputText from "./input_text";
import { User } from "../../types/user";
import UploadImage from "./upload_image";
import DefaultAvatar from "../../assets/png/default_avatar.png";
import { editProfile } from "../../services/api/setting.api";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Button from "./button";
import { Button as AntButton, Modal } from "antd";
import { logout } from "../../services/api/auth.api";
import { useAppDispatch } from "../../redux/hooks";
import { removeAccessToken } from "../../redux/auth/authSlice";

interface ProfileProps {
  data: User;
}
interface ErrorType {
  data: {
    message: string;
  };
}

const Profile: React.FC<ProfileProps> = (props) => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<User>({
    full_name: props.data?.full_name,
    email: props.data.email,
    avatar: props.data.avatar || DefaultAvatar,
  });
  const [image, setImage] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const { mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      setIsLoading(true);
      await editProfile(formData);
    },
    onSuccess() {
      toast.success("Thay đổi thông tin thành công");
      setIsLoading(false);
    },
    onError(error: any) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("full_name", userData.full_name);
    mutate(formData);
  };

  const handleImageChange = (file: File) => {
    setImage(file);
  };

  const handleLogOut = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsModalOpen(false);
        setTimeout(() => {
          dispatch(removeAccessToken());
        }, 1000);
      }
    } catch (error) {
      toast.error((error as ErrorType).data.message);
    }
  };

  return (
    <form className="mt-10 w-full" onSubmit={handleSubmit}>
      <Toaster position="top-right" />
      <div className="flex w-full flex-col-reverse items-center">
        <div className="w-full">
          <InputText
            type="text"
            name="Họ và tên"
            field="full_name"
            value={userData.full_name}
            onChange={handleInputChange}
            disable={false}
            maxLength={30}
          />
          <InputText
            type="text"
            name="Email"
            field="email"
            value={userData.email}
            onChange={handleInputChange}
            disable={true}
            maxLength={30}
          />
        </div>
        <UploadImage
          handleImageChange={handleImageChange}
          image={userData.avatar}
        />
      </div>
      <Button isLoading={isLoading} name="Cập nhật" />
      <AntButton
        type="primary"
        size="large"
        className="w-full rounded-full mt-5"
        danger
        onClick={() => setIsModalOpen(true)}
      >
        Đăng xuất
      </AntButton>

      <Modal
        title="Xác nhận đăng xuất"
        open={isModalOpen}
        onOk={handleLogOut}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        destroyOnClose
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>
    </form>
  );
};

export default Profile;
