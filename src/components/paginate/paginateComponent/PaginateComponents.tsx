import ReactPaginate from "react-paginate"
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

type PaginateCompo = {
    handlePageClick: (e: {selected:number}) => void
    pageCount: number;
}

const PaginateComponents = ({handlePageClick,pageCount}:PaginateCompo) => {
  return (
    <>
        <ReactPaginate
            className="w-[1280px] flex items-center justify-center gap-x-[10px] fixed "
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            pageCount={pageCount}
            previousLabel={<IoChevronBackOutline className="size-[16px] text-[#0094FF]" />}
            pageClassName="inline-block mx-1"
            pageLinkClassName="py-2 px-4 border rounded-lg text-[#0094FF] hover:bg-gray-200"
            previousClassName="inline-block"
            previousLinkClassName="py-2 px-4 text-[#0094FF]"
            nextLabel={<IoChevronForwardOutline className="size-[16px] text-[#0094FF]" />}
            nextClassName="inline-block"
            nextLinkClassName="py-2 px-4 text-[#0094FF]"
            breakLabel="..."
            breakClassName="inline-block mx-1"
            breakLinkClassName="py-2 px-4 border rounded-lg text-[#0094FF] hover:bg-gray-200"
            containerClassName="flex justify-center py-4"
            activeClassName="font-bold text-white "
            activeLinkClassName="font-bold "
        />
    </>
  )
}

export default PaginateComponents