import {z} from "zod";
import {requiredString} from "../util/util.ts";
export const EditProfileSchema = z.object({
 displayName: requiredString('Display Name'),
 bio: z.string().optional()
});

export type EditProfileSchema = z.infer<typeof EditProfileSchema>;