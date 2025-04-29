import supabase from '@/services/supabase'
import { ICabinCreateInputProps } from '@/types/cabin'

export async function getCabins() {
  try {
    const { data: cabins, error } = await supabase.from('cabins').select('*')
    if (error) {
      console.error(error)
      throw new Error("we couldn't load the cabins.")
    }

    return cabins
  } catch (error) {
    console.log(error)
  }
}

export async function createCabin(cabin: ICabinCreateInputProps) {
  const { data, error } = await supabase.from('cabins').insert([cabin]).select()

  if (error) {
    console.log(error)
    throw new Error("We couldn't create the cabin at the moment.")
  }

  return data
}

export async function delteCabin(cabinId: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', cabinId)
  if (error) {
    console.error(error)
    throw new Error("we couldn't delete the cabin.")
  }
  return data
}
