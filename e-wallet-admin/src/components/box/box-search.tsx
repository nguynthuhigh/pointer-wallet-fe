import React from "react";
import { FaSearch } from "react-icons/fa";

type SearchProps = {
    search: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchBox = ({search,handleSearch}:SearchProps) => {    
    return (
        <div id="SearchBox" className="flex items-center w-[200px] rounded-[4px] border-[1px] border-gray-400 overflow-hidden bg-gray-800 opacity-70 backdrop-blur-md focus-within:border-blue-600 ">
            <button className="ml-[20px] mr-[15px]"><FaSearch className="size-[15px] text-[#006CFF] " /></button>
                <input
                type="text"
                placeholder="Search"
                className="w-full p-2 outline-none bg-gray-800 opacity-70 backdrop-blur-md"
                value={search}
                onChange={handleSearch}
            />
        </div>                 
  )
}

