import { useI18n } from 'vue-i18n'
import { useHost } from '@homeapps/plugin-sdk'
import { relativeDay } from './timeline'

/** Times and days in the app's language. */
export function useFormat() {
  const host = useHost()
  const { locale } = useI18n({ useScope: 'global' })

  const time = (iso: string) => new Date(iso).toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' })

  /** "Dziś", "Wczoraj", otherwise "poniedziałek, 3 listopada" (with the year when it is not this one). */
  function day(iso: string) {
    const relative = relativeDay(iso)
    if (relative) return host.t(`day.${relative}`)
    const date = new Date(iso)
    return date.toLocaleDateString(locale.value, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
    })
  }

  /** For the conversation list: the time today, otherwise a short date. */
  function when(iso: string) {
    if (relativeDay(iso) === 'today') return time(iso)
    return new Date(iso).toLocaleDateString(locale.value, { day: 'numeric', month: 'short' })
  }

  return { time, day, when }
}
