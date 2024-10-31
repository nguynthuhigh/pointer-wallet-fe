export const HeaderComponent = ({title} : {title:string}) => {
    return (
        <>
            <header className="bg-gray-800 bg-opacity-70 backdrop-blur-md  border-b shadow-sm border-gray-700">
                <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6">
                    <p className="text-3xl font-semibold text-gray-100">{title}</p>
                </div>
            </header>
        
        </>
    )
}