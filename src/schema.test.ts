import { describe, expect, it } from 'vitest'
import { settingsSchema, validateSettings } from './schema'

describe('settingsSchema', () => {
  describe('displayName', () => {
    it('rejects empty display name', () => {
      const result = validateSettings({ displayName: '', email: 'user@example.com' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.displayName).toContain(
          'Display name is required',
        )
      }
    })

    it('rejects display name shorter than 2 characters', () => {
      const result = validateSettings({ displayName: 'A', email: 'user@example.com' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.displayName).toContain(
          'Display name must be at least 2 characters',
        )
      }
    })

    it('accepts display name with exactly 2 characters', () => {
      const result = validateSettings({ displayName: 'Al', email: 'user@example.com' })
      expect(result.success).toBe(true)
    })

    it('accepts display name with 50 characters', () => {
      const result = validateSettings({
        displayName: 'A'.repeat(50),
        email: 'user@example.com',
      })
      expect(result.success).toBe(true)
    })

    it('rejects display name longer than 50 characters', () => {
      const result = validateSettings({
        displayName: 'A'.repeat(51),
        email: 'user@example.com',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.displayName).toContain(
          'Display name must be at most 50 characters',
        )
      }
    })
  })

  describe('email', () => {
    it('rejects empty email', () => {
      const result = validateSettings({ displayName: 'Alex', email: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toContain('Email is required')
      }
    })

    it('rejects invalid email format', () => {
      const result = validateSettings({ displayName: 'Alex', email: 'not-an-email' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toContain(
          'Enter a valid email address',
        )
      }
    })

    it('accepts valid email format', () => {
      const result = validateSettings({ displayName: 'Alex', email: 'alex@example.com' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('alex@example.com')
      }
    })
  })

  describe('valid submission', () => {
    it('parses valid settings data', () => {
      const input = { displayName: 'Alex Morgan', email: 'alex@example.com' }
      const result = settingsSchema.parse(input)
      expect(result).toEqual(input)
    })
  })
})
