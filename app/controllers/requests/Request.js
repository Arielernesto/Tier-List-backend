import z from 'zod'

export const TierSchema = z.object({
    name: z.string().min(5),
    description: z.string().min(10),
    rows: z.array(z.object({
        id: z.string(),
        rank: z.string(),
        color: z.string(),
        items: z.array().optional()
    })),
    image: z.string(),
    status: z.boolean()
})