export const DeleteBox = ({clearFilters}: {clearFilters: () => void}) => {
    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 active:bg-opacity-70 transition-all duration-300 h-[42px] w-[44px] rounded-[6px] font-semibold uppercase text-center"
                onClick={clearFilters}>
                X
            </button>
        </>
    )
}


