
    export const AreaProgressChart = () => {
        const data = [
            {
            id: 1,
            name: 'Transfer',
            percentValues: 90,
            
            },
            {
                id: 2,
                name: 'Deposit',
                percentValues: 20,
            
            },
            {
                id: 3,
                name: "Payment",
                percentValues: 40,
            
            },
            {
                id: 4,
                name: 'Withdraw',
                percentValues: 70,
            
            }
        ]
    return (
        <>
            <div className='mt-5'>
                <div style={{background: '#FFFFFF', borderRadius: '8px', height: '355px',border: '1px solid #0094FF' }}>
                    <p className='ml-5 mt-5 font-semibold text-2xl '>Most Transactions Type</p>
                    <div className='mx-5 mt-2'>
                        {data.map((progress) => {
                            return (
                                <div key={progress.id} className='mb-2 '>
                                    <div className="">
                                        <div className='flex items-center justify-between font-semibold content-between'>
                                            <p className=" font-semibold text-lg">{progress.name}</p>
                                            <p className="text-lg">{progress.percentValues}</p>  
                                        </div>
                                        <div className='h-[10px] bg-gray-200 border-[1px] border-gray-200 rounded-full relative my-3'>
                                            <p className='h-full bg-[#0094FF] rounded-full' style={{width: `${progress.percentValues}%`}}></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
    }

