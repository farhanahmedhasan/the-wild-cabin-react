import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { customToastError, customToastSuccess } from '@/components/toast'
import FormTextarea from '@/components/form/FormTextArea'
import { ICabinCreateInputProps } from '@/types/cabin'
import FormInput from '@/components/form/FormInput'
import { createCabin } from '@/services/apiCabins'
import { Button } from '@/components/ui/Button'

export default function DashboardCabinCreate() {
  const { register, handleSubmit, reset } = useForm<ICabinCreateInputProps>()

  const queryClient = useQueryClient()
  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      customToastSuccess('Cabin has been created successfully.')
      reset()
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },

    onError: (err) => customToastError(err.message)
  })

  function onSubmit(data: ICabinCreateInputProps) {
    mutate(data)
  }

  return (
    <form className="font-poppins space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Cabin Name" {...register('name')} required />
        <FormInput label="Maximum Capacity" type="number" {...register('max_capacity')} required />
        <FormInput label="Regular Price" type="number" {...register('regular_price')} required />
        <FormInput label="Discount" type="number" defaultValue={0} {...register('discount')} />
        <FormTextarea containerClassName="col-span-2" label="Description For Website" {...register('description')} />
        <FormInput containerClassName="col-span-2" label="Cabin Photo" {...register('image_url')} />
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="secondary" type="reset">
          Reset
        </Button>
        <Button size="sm" disabled={isCreating}>
          Add New Cabin
        </Button>
      </div>
    </form>
  )
}
