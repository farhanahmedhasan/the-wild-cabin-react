import supabase from '@/services/supabase'

export async function getCabins() {
  try {
    const { data: cabins, error } = await supabase.from('cabins').select('*')
    if (error) {
      console.error(error)
      throw new Error("we couldn't load the cabins")
    }

    return cabins
  } catch (error) {
    console.log(error)
  }
}
