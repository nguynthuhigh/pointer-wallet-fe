import { CgSortZa } from "react-icons/cg";
import { CgSortAz } from "react-icons/cg";

type SortBoxProps = {
    handleSortOrder: () => void;
    sortOrder: 'asc' | 'desc'
}

export const SortBox = ({handleSortOrder,sortOrder}:SortBoxProps) => {
    return (
        <button className="border-[1px] border-gray-300 rounded-[8px] px-3 hover:shadow-lg hover:shadow-[#0094FF]/50 duration-300 transition-all hover:bg-[#0094FF] hover:border-[#0094FF] hover:text-white"
            onClick={handleSortOrder}
            >
            {sortOrder === 'asc' ? <CgSortZa className='size-[18px]'/> : <CgSortAz className='size-[18px]'/>}
        </button>
    )
}