import { format, formatDistanceToNow, type DateArg } from "date-fns";
import { pl } from "date-fns/locale";
import z from "zod";

export function formatDate(date: DateArg<Date>){
    return format(date,'dd MMM yyyy h:mm');
    
}

export function timeAgo(date: DateArg<Date>) {
    const parsed = new Date(date);
    return formatDistanceToNow(parsed, { locale: pl, addSuffix: true });
}


export const requiredString = (fieldName: string) =>    ( z
    .string({required_error: `Pole ${fieldName} jest wymagane.`})
    .min(1,{message:`Pole ${fieldName} jest wymagane.`}))
