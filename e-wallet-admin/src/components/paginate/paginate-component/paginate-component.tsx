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
            className="flex items-center gap-x-[10px] h-[32px] justify-center "
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            pageCount={pageCount}
            previousLabel={<IoChevronBackOutline className="size-[16px] text-gray-100 " />}
            // pageClassName="inline-block mx-1"
            pageLinkClassName="py-1 px-3 border rounded-[5px] text-gray-100 hover:bg-gray-200"
            previousClassName="inline-block mx-1"
            previousLinkClassName="text-gray-100 "
            nextLabel={<IoChevronForwardOutline className="size-[16px] text-gray-100 " />}
            nextClassName="inline-block mx-1"
            nextLinkClassName="text-gray-100 "
            breakLabel="..."
            breakClassName="inline-block mx-1"
            breakLinkClassName="py-1 px-3 border rounded-[5px] text-gray-100 hover:bg-gray-200"
            containerClassName="flex justify-center py-4"
            // activeClassName="font-bold text-white "
            activeLinkClassName="font-bold "
        />
    </>
  )
}

export default PaginateComponents