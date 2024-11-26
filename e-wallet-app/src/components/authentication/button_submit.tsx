import LoadingIcon from "../../assets/svg/loading.svg";

export const ButtonSubmit = ({ ...props }) => {
  return (
    <>
      {!props.isLoading ? (
        <button
          className={`w-full bg-blue-default my-4 font-semibold text-white p-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-blue-600 active:scale-95`}
          onClick={props.onClick}
        >
          {props.title}
        </button>
      ) : (
        <button
          disabled
          className={`w-full bg-gray-100 my-4 font-semibold text-gray-400 p-3 rounded-xl cursor-not-allowed transition-all duration-300 ease-in-out`}
        >
          <img className={`animate-spin mx-auto w-6 h-6`} src={LoadingIcon} />
        </button>
      )}
    </>
  );
};
