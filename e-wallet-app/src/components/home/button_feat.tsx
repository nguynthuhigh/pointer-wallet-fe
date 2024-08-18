import { Link } from "react-router-dom";
const ButtonFeature = ({ ...props }) => {
  return (
    <Link to={props.link}>
      <div className={`w-full flex  flex-col items-center justify-center`}>
        <div
          className={`rounded-full hover:bg-button-hover cursor-pointer bg-button px-4 w-14 h-14 flex items-center`}
        >
          <img src={props.image}></img>
        </div>
        <h1 className={`text-sm my-2 text-center`}>{props.title}</h1>
      </div>
    </Link>
  );
};

export default ButtonFeature;
