export interface ICabin {
  id: number
  name: string
  image_url: string
  description: string
  max_capacity: number
  regular_price: number
  discount: number
}

export interface ICabinCreateInputProps {
  name: string
  max_capacity: string
  regular_price: string
  discount: string
  description: string
  image_url: string
}
