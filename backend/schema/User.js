import { z } from 'zod'

const userSchema = z.object({
    username: z
    .string()
    .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    .max(20, { message: 'El nombre del usuario no puede superar los 20 caracteres' }),

    email: z
    .string()
    .trim()
    .email({ message: 'El formato del correo electrónico no es válido' }),

    password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .regex(/[A-Z]/, { message: 'La contraseña debe incluir al menos una letra mayúscula'})
    .regex(/[0-9]/, { message: 'La contraseña debe incluir un número' }),

    role: z
    .enum(['User', 'Admin', 'Tester'])
    .default('User'),

})

const editUserSchema = userSchema.omit({ password: true })

export function validateUser (object) {
    return userSchema.safeParse(object)
}

export function validateEditUser(object) {
    return editUserSchema.safeParse(object)
}
