import BackArrow from "../../assets/svg/back_arrow.svg";
const HeaderTransfer = ({ ...props }) => {

  return (
    <div class={`my-2 font-semibold flex justify-between text-lg`}>
      <button onClick={()=>{props.onClick()}}>
        <img class={`w-2`} src={BackArrow}></img>
      </button>
      <h1>{props.title}</h1>
      <div></div>
    </div>
  );
};

export default HeaderTransfer;
