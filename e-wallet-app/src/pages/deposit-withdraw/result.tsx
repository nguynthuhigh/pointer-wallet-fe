import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Button, Typography, Space, Tag } from "antd";

const { Title, Text } = Typography;

import { formatDate } from "../../utils/format_date";
import { formatCurrency } from "../../utils/format_currency";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, amount, currency, createdAt, title, _id } =
    location.state || {};

  return (
    <div className="w-full flex items-start justify-center p-4 bg-white">
      <Card
        style={{ width: 400 }}
        bordered
        className="shadow-md transition-colors duration-300 ease-in-out hover:shadow-lg"
      >
        <div className="text-center mb-4">
          <Space align="center" className="mb-2">
            <CheckCircleOutlined className={"text-blue-600 text-4xl"} />
          </Space>
          <Title level={3} className="text-blue-500">
            {type} thành công!
          </Title>
        </div>
        <div className="text-center mb-4">
          <Title level={2}>{formatCurrency(amount, currency)}</Title>
          <Text type="secondary">{title}</Text>
        </div>
        <div className="mb-4">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div className="flex justify-between">
              <Text type="secondary">Trạng thái:</Text>
              <Tag color="gold">Hoàn thành</Tag>
            </div>
            <div className="flex justify-between">
              <Text type="secondary">Mã giao dịch:</Text>
              <Text strong>{_id}</Text>
            </div>
            <div className="flex justify-between">
              <Text type="secondary">Thời gian:</Text>
              <Text strong>{formatDate(createdAt)}</Text>
            </div>
          </Space>
        </div>
        <Button type="primary" block onClick={() => navigate("/")}>
          Quay lại trang chủ
        </Button>
      </Card>
    </div>
  );
};

export default Result;
