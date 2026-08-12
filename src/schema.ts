import { z } from 'zod'

export const settingsSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be at most 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
})

export type SettingsFormData = z.infer<typeof settingsSchema>

export const defaultSettings: SettingsFormData = {
  displayName: '',
  email: '',
}

export function validateSettings(data: unknown) {
  return settingsSchema.safeParse(data)
}
