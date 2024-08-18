import BackArrow from "../../assets/svg/back_arrow.svg";
import { useNavigate } from "react-router-dom";
const HeaderDefault = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <div class={`my-2 font-semibold flex justify-between text-lg`}>
      <button onClick={() => navigate(-1)}>
        <img class={`w-2`} src={BackArrow}></img>
      </button>
      <h1>{props.title}</h1>
      <div></div>
    </div>
  );
};

export default HeaderDefault;
