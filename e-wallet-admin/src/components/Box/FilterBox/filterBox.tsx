export type FilterBoxProps = {
    filter: 'all' | 'false' | 'true';
    handleFilterChange: (newFilter: 'all' | 'false' | 'true') => void
}

export const FilterBox = ({filter,handleFilterChange}: FilterBoxProps) => {
    return (
        <>
            <select
                value={filter}
                onChange={(e:React.ChangeEvent<HTMLSelectElement>) => handleFilterChange(e.target.value as 'all' | 'false' | 'true')}
                className="border-[1px] p-1 rounded-[4px] border-gray-300 h-[36px] w-full text-sm outline-none appearance-none pl-[15px] pr-[15px]" 
            >
                <option value="all">All</option>
                <option value="false">Active</option>
                <option value="true">Inactive</option>
            </select>
            <span className='absolute top-[-0.7rem]  left-[32px] bg-white text-[#0094FF] transform -translate-x-1/2 text-sm'>Filter</span>
        </>
    )

}