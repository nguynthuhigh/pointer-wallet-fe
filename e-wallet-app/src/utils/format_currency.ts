export const formatCurrency = (balance:any,currency:any)=>{
    if(!currency){
        return 'error'
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(balance)
  }