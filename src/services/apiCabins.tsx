import supabase, { supabaseCabinImagesBucket } from '@/services/supabase'
import { CabinSchemaType } from '@/schemas/cabinSchema'

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

export async function createCabin(cabin: CabinSchemaType) {
  const imageName = `${Date.now()}-${cabin.image?.name}`.replaceAll('/', '')
  const imagePath = `${supabaseCabinImagesBucket}${imageName}`

  // Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabin, image: cabin.image?.name ? imagePath : null }])
    .select()
    .single()

  if (error || !data || data.length === 0) {
    console.log(error)
    throw new Error("We couldn't create the cabin at the moment.")
  }

  // Upload image
  if (cabin.image) {
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, cabin.image)

    // Delete the cabin if there was an error uploading the image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id)
      console.log(storageError)
      throw new Error('Cabin image could not be uploaded and cabin was not created')
    }
  }

  return data
}

export async function editCabin(cabin: CabinSchemaType) {
  const { data, error } = await supabase.from('cabins').update(cabin).eq('id', cabin.id).select().single()
  console.log(data)

  if (error) {
    console.log(error)
    throw new Error("We couldn't update the image.")
  }

  return data
}

export async function delteCabin(cabinId: number, cabinImageUrl: string) {
  const imageName = cabinImageUrl?.substring(cabinImageUrl.lastIndexOf('//') + 2)

  await supabase.storage.from('cabin-images').remove([imageName])

  const { data, error } = await supabase.from('cabins').delete().eq('id', cabinId)
  if (error) {
    console.error(error)
    throw new Error("we couldn't delete the cabin.")
  }
  return data
}
