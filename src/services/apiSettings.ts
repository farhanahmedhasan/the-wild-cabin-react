import supabase from '@/services/supabase'
import ISettings from '@/types/settings'

export async function getSettings(): Promise<ISettings> {
  const { data: settings, error } = await supabase
    .from('settings')
    .select('breakfast_price, min_booking_days, max_booking_days, max_guests_per_booking')
    .single()

  if (error || !settings) {
    console.error(error)
    throw new Error('We could not get the settings, Try again later..')
  }

  return settings
}
