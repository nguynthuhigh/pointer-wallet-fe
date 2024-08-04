const moment = require('moment');
export const formatCurrency = (money, currency)=>{
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      });
    return formatter.format(money)
}
export const formatTime = (date)=>{
    const createdAtFromMongoDB = new Date(date);
    return moment(createdAtFromMongoDB).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
}
const formatUtils = {
    formatCurrency,
    formatTime
}
export default formatUtils