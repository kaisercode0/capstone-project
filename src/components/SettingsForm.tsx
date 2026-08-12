import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { defaultSettings, settingsSchema, type SettingsFormData } from '../schema'
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
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { ...defaultSettings, ...initialValues },
    mode: 'onBlur',
  })

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
        <p>Update your profile information.</p>
      </header>

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
