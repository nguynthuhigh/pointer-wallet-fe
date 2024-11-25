import { IGetThisWeek } from "@/interfaces/analyst"
import { format } from "date-fns"

export const formatDateApi = (data:IGetThisWeek[]) => {
    return data.map(item => ({
        ...item,    
        date: format(new Date(item.date),'MMM-dd')
    }))
}