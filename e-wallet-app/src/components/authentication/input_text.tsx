import { useState } from "preact/hooks";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputText = ({ ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    if (!props.isFetching) {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    <div class={`my-2 relative`}>
      <label
        class={`font-semibold text-gray-400 ml-2 text-sm`}
        name={props.name}
      >
        {props.title}
      </label>
      <input
        {...(props.register ? props.register(props.name) : {})}
        onChange={(e) => {
          if (!props.isFetching) {
            props.onChange(e);
          }
        }}
        required
        type={
          isPasswordVisible && props.type === "password" ? "text" : props.type
        }
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.isFetching}
        class={`pl-2 focus:outline-blue-default text-sm w-full border-2 py-3 rounded-xl p-2 ${
          props.error ? "border-red-400" : ""
        } ${props.isFetching ? "cursor-not-allowed bg-gray-100" : ""}`}
      />
      {props.type === "password" && (
        <div
          class="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default InputText;
