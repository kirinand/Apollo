import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(1).max(50).refine(val => val.trim() != '', {
      message: "Name must not be blank"
    }
  ),
  email: z.string().email(),
  password: z.string().min(8).max(32)
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const emailSchema = z.object({
  email: loginSchema.shape.email
})

export const passwordSchema = z.object({
  password: signupSchema.shape.password
})