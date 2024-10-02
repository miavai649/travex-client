import { z } from 'zod'

export const loginValidationSchema = z.object({
  email: z.string().trim().email('Please enter a valid email'),
  password: z.string().trim().min(1, 'Password needs to be at lest 1 character')
})
