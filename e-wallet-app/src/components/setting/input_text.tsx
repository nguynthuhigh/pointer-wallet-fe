import React, { ChangeEvent } from 'react';

interface InputTextProps {
  name?: string;
  field: string;
  value?: string;
  onChange: (field: string, value: string) => void;
  disable?:boolean;
  type:string;
  maxLength?:number;
  pattern?:string
}

const InputText: React.FC<InputTextProps> = ({ name, field, value, onChange,disable,type,maxLength,pattern }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field, (e.target as HTMLInputElement).value);
  };

  return (
    <div className="border rounded-lg p-2 my-2 w-full">
      <h1 className="font-semibold text-sm">{name}</h1>
      <input
        type={type}
        className="w-full text-lg bg-white focus-within:outline-none"
        value={value}
        onChange={handleChange}
        disabled={disable}
        maxLength={maxLength}
        pattern={pattern}
      />
    </div>
  );
};

export default InputText;
