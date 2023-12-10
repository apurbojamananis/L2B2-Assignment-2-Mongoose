import { z } from 'zod'

const fullNameZodValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const addressZodValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
})

const ordersZodValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(5).max(15),
  password: z.string().max(20),
  fullName: fullNameZodValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressZodValidationSchema,
  orders: z.array(ordersZodValidationSchema).optional(),
})

export default userValidationSchema
