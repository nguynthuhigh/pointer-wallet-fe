const InputField = ({
  label,
  name,
  value,
  onChange,
  onFocus,
  isValid,
  placeholder,
  maxLength,
}: any) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`mt-1 p-3 block w-full border ${
          isValid ? "border-gray-300" : "border-gray-500"
        } rounded-md focus:outline-blue-default`}
      />
    </div>
  );
};

export default InputField;
