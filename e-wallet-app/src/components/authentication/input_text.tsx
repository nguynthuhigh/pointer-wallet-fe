import { useState } from "preact/hooks";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputText = ({ ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
        onChange={props.onChange}
        required
        type={
          isPasswordVisible && props.type === "password" ? "text" : props.type
        }
        name={props.name}
        placeholder={props.placeholder}
        class={`pl-2 focus:outline-blue-default text-sm w-full border-2 py-3 rounded-xl p-2 ${
          props.error && "border-red-400"
        }`}
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
