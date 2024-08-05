import { format } from 'date-fns-tz';

export const formatDate = (date:Date)=>{
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
    return formattedDate; 
}
