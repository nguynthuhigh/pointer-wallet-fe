import { IGetThisWeek } from "@/interfaces/analyst"
import { format } from "date-fns"

export const processWeek = (data:IGetThisWeek[]) => {
    if (!data) return [];
    return data.map(item => ({
        ...item,    
        date: format(new Date(item.date),'MMM-dd')
    }))
}


interface IDataItem {
    transaction: number,
    [key: string] : string | number
}

export const processMonth = (data:IDataItem[]) => {
    if (!data) return [];
    return data.map((item,index) => ({
        ...item,
        label: index === 0 ? 'This week' : `${index} week ago`
    }))
 }

 