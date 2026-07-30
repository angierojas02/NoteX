import { z } from 'zod'

const taskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(['Alta', 'Baja', 'Media' ]),
    status: z.enum(['Pendiente', 'En proceso', 'Completada' ]).default('Pendiente')
})

export function validateTask (object) {
    return taskSchema.safeParse(object)
}

