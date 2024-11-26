import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/api/auth.api";
import AuthImg from "../../assets/png/auth_img.png";

interface ErrorType {
  data: {
    message: string;
  };
}

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: { email: string }) => {
    setIsLoading(true);
    try {
      const response = await forgotPassword(values.email);
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/auth/login/reset-password", {
          state: { email: values.email },
        });
        form.resetFields();
      }
    } catch (error) {
      message.error((error as ErrorType).data.message);
    }
  };

  return (
    <div className={"flex justify-center items-center h-screen bg-gray-100"}>
      <Card title="Khôi phục mật khẩu" style={{ width: 450 }} bordered>
        <img class="mx-auto mt-10 w-52" src={AuthImg}></img>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn" },
              { type: "email", message: "Địa chỉ email không hợp lệ" },
            ]}
          >
            <Input
              disabled={isLoading}
              placeholder="Nhập email của bạn"
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Button
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Gửi email khôi phục"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
