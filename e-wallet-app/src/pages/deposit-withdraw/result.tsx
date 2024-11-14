import { Link, useNavigate, useLocation } from "react-router-dom";
import ic_success from "../../assets/png/ic_success.png";
import ic_home from "../../assets/svg/home.svg";
import { formatDate } from "../../utils/format_date";
import { formatCurrency } from "../../utils/format_currency";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, amount, currency, createdAt } = location.state || {};

  return (
    <div className="p-6 w-full bg-white m-4 rounded-lg border max-w-[600px] shadow-xl mx-auto">
      <div className="flex justify-end">
        <Link to="/">
          <img
            className="w-8 h-8 transition-transform transform hover:scale-110"
            src={ic_home}
            alt="Home"
          />
        </Link>
      </div>

      <div className="text-center mt-4">
        <img
          className="mx-auto w-24 h-24 animate-bounce"
          src={ic_success}
          alt="Success"
        />
        <h1 className="text-xl font-semibold mt-4 text-gray-700">
          {type} thành công
        </h1>
        <h1 className="text-4xl font-bold text-blue-600 my-4">
          {formatCurrency(amount, currency)}
        </h1>
        <h1 className="text-sm text-gray-500">{formatDate(createdAt)}</h1>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <Link
            className="border border-blue-600 text-blue-600 hover:bg-blue-100 transition-all p-2 rounded-lg w-[48%] text-center font-semibold shadow-sm hover:shadow-md"
            to="/"
          >
            Quay về
          </Link>
          <button
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all p-2 rounded-lg w-[48%] text-center font-semibold shadow-sm hover:shadow-md"
            onClick={() => navigate(-1)}
          >
            {type} tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
