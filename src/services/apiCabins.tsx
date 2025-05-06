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
  const { id, image, ...cabinData } = cabin
  if (!id) throw new Error('No id found')

  const updatedCabinData: Partial<CabinSchemaType> = { ...cabinData }

  if (image && typeof image !== 'string') {
    // Get existing cabin before overwritting
    const { data: existingCabin, error: fetchError } = await supabase
      .from('cabins')
      .select('image')
      .eq('id', id)
      .maybeSingle()

    if (fetchError) throw new Error('Failed to fetch existing cabin image')

    // Update image
    const imageName = `${Date.now()}-${image.name}`.replaceAll('/', '')
    const imagePath = `${supabaseCabinImagesBucket}${imageName}`
    updatedCabinData.image = imagePath

    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, image)
    if (storageError) throw new Error('Failed to upload image')

    // Delete existing image
    if (existingCabin?.image) {
      const existingImageName = existingCabin.image.replace(supabaseCabinImagesBucket, '')
      await supabase.storage.from('cabin-images').remove([existingImageName])
    }
  }

  const { data, error } = await supabase
    .from('cabins')
    .update({ image: image, ...updatedCabinData })
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) throw new Error("We couldn't update the cabin.")

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
