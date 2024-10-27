import { CgSortZa } from "react-icons/cg";
import { CgSortAz } from "react-icons/cg";

type SortBoxProps = {
    handleSortOrder: () => void;
    sortOrder: 'asc' | 'desc'
}

export const SortBox = ({handleSortOrder,sortOrder}:SortBoxProps) => {
    return (
        <button className="border-[1px] border-gray-400 rounded-[8px] px-3 hover:shadow-lg hover:shadow-[#0094FF]/50 duration-400 transition-all hover:bg-[#0094FF] hover:border-[#0094FF] hover:text-white active:opacity-30 active:transition-all duration-300 active:bg-[#0094FF]"
            onClick={handleSortOrder}
            >
            {sortOrder === 'asc' ? <CgSortZa className='size-[18px]'/> : <CgSortAz className='size-[18px]'/>}
        </button>
    )
}