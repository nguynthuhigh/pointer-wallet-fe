import BackArrow from "../../assets/svg/back_arrow.svg";
import { useNavigate } from "react-router-dom";
const HeaderDefault = ({ ...props }) => {
  const navigate = useNavigate();
  
  return (
    <div class={`my-2 font-semibold flex justify-between text-lg`}>
      <button onClick={() => navigate(-1)}>
        <div class={`w-5 h-5`}>
          <img class={`w-2`} src={BackArrow}></img>
        </div>
      </button>
      <h1>{props.title}</h1>
      <div></div>
    </div>
  );
};

export default HeaderDefault;
