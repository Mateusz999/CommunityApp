import { z } from 'zod'
import { requiredString } from '../util/util';

export const activitySchema = z.object({
    title: requiredString('Tytuł'),
    description: requiredString('Opis'),
    category: requiredString('Kategoria'),
    date: z.coerce.date({
        message: 'Data jest wymagana'
    }),
    location: z.object({
        venue: requiredString("Miejsce"),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number()
    })
})

export type activitySchema = z.infer<typeof activitySchema>;