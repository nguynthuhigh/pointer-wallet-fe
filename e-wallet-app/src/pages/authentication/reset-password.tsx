import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { resetPassword } from "../../services/api/auth.api";
import { useNavigate, useLocation } from "react-router-dom";

interface ErrorType {
  data: {
    message: string;
  };
}

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email;

  const [form] = Form.useForm();

  const onFinish = async (values: {
    otp: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await resetPassword({ ...values, email });
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/auth/login");
        form.resetFields();
      }
    } catch (error) {
      message.error((error as ErrorType).data.message);
    }
  };

  return (
    <div className={"flex justify-center items-center h-screen bg-gray-100"}>
      <Card title="Khôi phục mật khẩu" style={{ width: 450 }} bordered>
        <p>Nhập các thông tin cần thiết để khôi phục mật khẩu</p>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="otp"
            label="Mã OTP"
            rules={[
              { required: true, message: "Vui lòng nhập mã OTP" },
              { len: 6, message: "Mã OTP phải bao gồm 6 ký tự số" },
            ]}
          >
            <Input
              disabled={isLoading}
              type="number"
              placeholder="Nhập mã OTP"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Mật khẩu phải bao gồm ít nhất một chữ cái viết thường, một chữ cái viết hoa, một chữ số và một ký tự đặc biệt.",
              },
            ]}
          >
            <Input.Password
              disabled={isLoading}
              placeholder="Nhập mật khẩu mới"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password
              disabled={isLoading}
              placeholder="Nhập lại mật khẩu"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Button
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            {isLoading ? "Đang khôi phục..." : "Khôi phục mật khẩu"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
