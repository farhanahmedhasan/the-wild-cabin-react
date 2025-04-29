import { useForm } from 'react-hook-form'

import FormTextarea from '@/components/form/FormTextArea'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'

interface InputProps {
  name: string
  max_capacity: string
  regular_price: string
  discount: string
  description: string
  image_url: string
}

export default function DashboardCabinCreate() {
  const { register, handleSubmit } = useForm<InputProps>()

  function onSubmit(data: InputProps) {
    console.log(data)
  }

  return (
    <form className="font-poppins space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Cabin Name" {...register('name')} required />
        <FormInput label="Maximum Capacity" {...register('max_capacity')} required />
        <FormInput label="Regular Price" type="number" {...register('regular_price')} required />
        <FormInput label="Discount" type="number" defaultValue={0} {...register('discount')} />
        <FormTextarea containerClassName="col-span-2" label="Description For Website" {...register('description')} />
        <FormInput containerClassName="col-span-2" label="Cabin Photo" {...register('image_url')} />
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="secondary" type="reset">
          Reset
        </Button>
        <Button size="sm">Add New Cabin</Button>
      </div>
    </form>
  )
}
