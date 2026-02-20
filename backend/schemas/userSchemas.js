import {z}  from 'zod'

export const createUserschema = z.object({
    name: z.string().min(1 , 'Name is required'),
    email: z.string().email('Email must be valid'),
    password: z
    .string()
    .min(6 , "Password must be at least 6 characters")
    .max(100 , 'Password must be   30 characters')
})