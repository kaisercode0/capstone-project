import { z } from 'zod'

export const settingsSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be at most 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  bio: z
    .string()
    .max(280, 'Bio must be at most 280 characters')
    .optional()
    .or(z.literal('')),
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Select a theme',
  }),
  language: z.enum(['en', 'es', 'fr', 'de', 'ja'], {
    required_error: 'Select a language',
  }),
  timezone: z.string().min(1, 'Select a timezone'),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
})

export type SettingsFormData = z.infer<typeof settingsSchema>

export const defaultSettings: SettingsFormData = {
  displayName: '',
  email: '',
  bio: '',
  theme: 'system',
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: false,
}

export const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Australia/Sydney',
  'UTC',
] as const

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
] as const
