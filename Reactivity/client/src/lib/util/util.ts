import { format, type DateArg } from "date-fns";
import z from "zod";

export function formatDate(date: DateArg<Date>){
    return format(date,'dd MMM yyy h:mm');
    
}


export const requiredString = (fieldName: string) =>    ( z
    .string({required_error: `Pole ${fieldName} jest wymagane.`})
    .min(1,{message:`Pole ${fieldName} jest wymagane.`}))
