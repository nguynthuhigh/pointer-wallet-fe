import { FaSearch } from "react-icons/fa";

type SearchProps = {
    search: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchBox = ({search,handleSearch}:SearchProps) => {    
    return (
        <div id="SearchBox" className="flex items-center w-[200px] border-gray-300 rounded-[8px] border-[1px] overflow-hidden focus-within:border-blue-600">
            <button className="ml-[24px] mr-[20px]"><FaSearch className="size-[15px] text-[#006CFF] " /></button>
                <input
                type="text"
                placeholder="Search"
                className="w-full p-2 outline-none"
                value={search}
                onChange={handleSearch}
            />
        </div>                 
  )
}

