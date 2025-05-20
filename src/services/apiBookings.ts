import supabase from '@/services/supabase'

export async function getBookings() {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(
      `id, start_date, end_date, created_at, cabin_price, extra_price, status, has_breakfast , cabins(name), guests(full_name,email)`
    )
  if (error) throw new Error("We coundn't load the bookings at the moment..")

  console.log(bookings)

  return bookings
}
