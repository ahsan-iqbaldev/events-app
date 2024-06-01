import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "just 400 character allow"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "just 400 character allow"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  startEndTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
