import Countdown from 'react-countdown';
export const CountDownTime = ({startTime}) => {
    const createdAtDate = new Date(startTime)

    const endTime = new Date(createdAtDate.getTime() + 1000 * 60 * 10);

    const handleComplete = () => {
        console.log('Countdown finished!');
      };
    
    const fulltime = ({total,completed}) => {
        if (completed){
            return <p className='text-center text-lg'>QR code đã hết hạn, Vui lòng thanh toán lại</p>
        }
        else {
            const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((total % (1000 * 60)) / 1000);
            return <p className='text-black text-xl'>{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</p>
        }
    }
    const startTimeInMilis = new Date(startTime).getTime();
    return (
        <>
            <div className='text-center space-y-2'>
                <p className = 'text-2xl text-red-500'>Thời gian còn lại:</p>
                <Countdown 
                date={endTime.getTime()}
                onComplete = {handleComplete}
                renderer={fulltime}/>
            </div>
        </>
    )
}