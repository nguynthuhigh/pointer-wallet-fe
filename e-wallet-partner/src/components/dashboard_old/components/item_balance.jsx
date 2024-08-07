import CountUp from 'react-countup';
export function ItemBalance({...props}){
    return(
        <div className={`bg-gradient-to-r relative from-[#FC5C7D] to-[#6A82FB] rounded-tr-[50px]  w-full h-[130px] rounded-2xl p-4`}>
        <h1 className='text-white font-bold text-4xl'>
        <CountUp  
            duration={2.5}
            prefix={props.prefix}
            suffix={props.suffix}
            separator={props.separator}
            decimals={props.decimals}
            decimal={props.decimal}
            start={0} 
            end={props.end}>
            </CountUp>
        </h1>
        <h1 className='text-white mt-4 font-bold text-3xl'>{props.currency}</h1>
        <img className=' absolute top-0 right-0' src={props.logo} alt='VND'></img>
    </div>
    )
}
export function ItemBalanceLoading({...props}){
    return(
        <div className={`bg-gray-300 w-full h-[130px] animate-pulse rounded-2xl p-4`}>
            <div className='bg-white font-bold text-4xl w-[200px] mt-2 h-[30px] rounded-full'>
            </div>
            <div className='bg-white font-bold text-4xl w-[300px] mt-5 h-[30px] rounded-full'>
            </div>
        </div>
    )
}