import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  defaultSettings,
  LANGUAGES,
  settingsSchema,
  TIMEZONES,
  type SettingsFormData,
} from '../schema'
import './SettingsForm.css'

type SettingsFormProps = {
  initialValues?: Partial<SettingsFormData>
  onSave?: (data: SettingsFormData) => Promise<void> | void
}

export function SettingsForm({ initialValues, onSave }: SettingsFormProps) {
  const [saved, setSaved] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { ...defaultSettings, ...initialValues },
    mode: 'onBlur',
  })

  const bio = watch('bio') ?? ''

  const onSubmit = async (data: SettingsFormData) => {
    setSubmitError(null)
    setSaved(false)
    try {
      if (onSave) {
        await onSave(data)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
      reset(data)
      setSaved(true)
    } catch {
      setSubmitError('Something went wrong while saving. Please try again.')
    }
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <header className="settings-form__header">
        <h1>Settings</h1>
        <p>Manage your profile and app preferences.</p>
      </header>

      <section className="settings-form__section" aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>

        <div className="field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.displayName}
            aria-describedby={errors.displayName ? 'displayName-error' : undefined}
            {...register('displayName')}
          />
          {errors.displayName && (
            <span id="displayName-error" className="field__error" role="alert">
              {errors.displayName.message}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <span id="email-error" className="field__error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="bio">
            Bio <span className="field__optional">(optional)</span>
          </label>
          <textarea
            id="bio"
            rows={3}
            aria-invalid={!!errors.bio}
            aria-describedby="bio-hint bio-error"
            {...register('bio')}
          />
          <span id="bio-hint" className="field__hint">
            {bio.length}/280 characters
          </span>
          {errors.bio && (
            <span id="bio-error" className="field__error" role="alert">
              {errors.bio.message}
            </span>
          )}
        </div>
      </section>

      <section className="settings-form__section" aria-labelledby="preferences-heading">
        <h2 id="preferences-heading">Preferences</h2>

        <div className="field-row">
          <div className="field">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              aria-invalid={!!errors.theme}
              aria-describedby={errors.theme ? 'theme-error' : undefined}
              {...register('theme')}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            {errors.theme && (
              <span id="theme-error" className="field__error" role="alert">
                {errors.theme.message}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              aria-invalid={!!errors.language}
              aria-describedby={errors.language ? 'language-error' : undefined}
              {...register('language')}
            >
              {LANGUAGES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.language && (
              <span id="language-error" className="field__error" role="alert">
                {errors.language.message}
              </span>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="timezone">Timezone</label>
          <select
            id="timezone"
            aria-invalid={!!errors.timezone}
            aria-describedby={errors.timezone ? 'timezone-error' : undefined}
            {...register('timezone')}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          {errors.timezone && (
            <span id="timezone-error" className="field__error" role="alert">
              {errors.timezone.message}
            </span>
          )}
        </div>
      </section>

      <section className="settings-form__section" aria-labelledby="notifications-heading">
        <h2 id="notifications-heading">Notifications</h2>

        <div className="toggle-list">
          <label className="toggle">
            <input type="checkbox" {...register('emailNotifications')} />
            <span className="toggle__content">
              <span className="toggle__label">Email notifications</span>
              <span className="toggle__desc">Receive updates about your account activity</span>
            </span>
          </label>

          <label className="toggle">
            <input type="checkbox" {...register('pushNotifications')} />
            <span className="toggle__content">
              <span className="toggle__label">Push notifications</span>
              <span className="toggle__desc">Get alerts on this device</span>
            </span>
          </label>

          <label className="toggle">
            <input type="checkbox" {...register('marketingEmails')} />
            <span className="toggle__content">
              <span className="toggle__label">Marketing emails</span>
              <span className="toggle__desc">Product news, tips, and offers</span>
            </span>
          </label>
        </div>
      </section>

      {submitError && (
        <div className="settings-form__banner settings-form__banner--error" role="alert">
          {submitError}
        </div>
      )}

      {saved && (
        <div className="settings-form__banner settings-form__banner--success" role="status">
          Settings saved successfully.
        </div>
      )}

      <footer className="settings-form__footer">
        <button
          type="button"
          className="btn btn--ghost"
          disabled={!isDirty || isSubmitting}
          onClick={() => reset({ ...defaultSettings, ...initialValues })}
        >
          Reset
        </button>
        <button type="submit" className="btn btn--primary" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving…' : 'Save changes'}
        </button>
      </footer>
    </form>
  )
}
