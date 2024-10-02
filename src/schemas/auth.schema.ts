import { z } from 'zod'

export const loginValidationSchema = z.object({
  email: z.string().trim().email('Please enter a valid email'),
  password: z.string().trim().min(1, 'Password needs to be at lest 1 character')
})

export const forgetPasswordValidationSchema = z.object({
  email: z.string().trim().email('Please enter a valid email')
})

export const resetPasswordValidationSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().trim()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })
