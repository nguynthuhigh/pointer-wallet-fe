import { Link } from "react-router-dom";

interface SideBarPartProps {
  link: string;
  handleSelect: () => void;
  name: string;
  selected: string;
  icon: string;
}

const SideBarPart: React.FC<SideBarPartProps> = ({
  link,
  handleSelect,
  name,
  selected,
  icon,
}) => {
  const isSelected = name === selected;
  return (
    <Link
      to={link}
      onClick={handleSelect}
      className="my-2 w-full flex h-[50px]"
    >
      <div
        className={`h-full w-[5px] rounded-r-lg transition-all duration-300 ${
          isSelected ? "bg-blue-600" : ""
        }`}
      ></div>
      <div
        className={`flex h-full w-full items-center rounded-lg ml-4 px-4 transition-colors duration-300 ${
          isSelected ? "bg-blue-500 hover:bg-blue-400" : "hover:bg-gray-100"
        }`}
      >
        <img
          className="w-[20px] transition-transform duration-300"
          src={icon}
          alt={`${name} icon`}
        />
        <h1
          className={`font-semibold ml-2 transition-colors duration-300 ${
            isSelected ? "text-white" : "text-gray-800"
          }`}
        >
          {name}
        </h1>
      </div>
    </Link>
  );
};

export default SideBarPart;
