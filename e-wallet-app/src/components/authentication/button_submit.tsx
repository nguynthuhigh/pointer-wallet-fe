import LoadingIcon from "../../assets/svg/loading.svg";

export const ButtonSubmit = ({ ...props }) => {
  return (
    <>
      {!props.isLoading ? (
        <button
          class={`w-full bg-blue-default my-4 font-semibold text-white p-3 rounded-xl`}
        >
          {props.title}
        </button>
      ) : (
        <button
          disabled
          class={` w-full bg-gray-100 my-4 font-semibold text-white p-3 rounded-xl`}
        >
          <img class={`animate-spin mx-auto`} src={LoadingIcon}></img>
        </button>
      )}
    </>
  );
};
