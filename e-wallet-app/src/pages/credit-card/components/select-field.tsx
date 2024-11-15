import Select from "react-select";

const SelectField = ({ label, options, onChange, isValid }: any) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <Select
        options={options.map((opt: string) => ({ value: opt, label: opt }))}
        placeholder={`Chọn ${label.toLowerCase()}`}
        classNamePrefix="react-select"
        onChange={(option: any) => onChange(option.value)}
        className={`react-select-container ${isValid ? "" : "border-red-500"}`}
      />
    </div>
  );
};

export default SelectField;
