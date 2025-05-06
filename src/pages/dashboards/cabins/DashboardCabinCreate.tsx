import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import useCreateCabin from '@/pages/dashboards/cabins/partials/useCreateCabin'
import { cabinSchema, CabinSchemaType } from '@/schemas/cabinSchema'
import FormTextarea from '@/components/form/FormTextArea'
import { Label } from '@/components/form/partials/Label'
import UploadImage from '@/components/form/UploadImage'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'

export default function DashboardCabinCreate() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CabinSchemaType>({
    resolver: zodResolver(cabinSchema)
  })

  const { isCreating, createCabinMutate } = useCreateCabin()

  function onSubmit(data: CabinSchemaType) {
    const image = data.image?.[0] ?? null
    createCabinMutate({ ...data, image })
  }

  return (
    <form className="font-poppins space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Cabin Name" {...register('name')} errorMessage={errors.name?.message} required />
        <FormInput
          label="Maximum Capacity"
          type="number"
          {...register('max_capacity')}
          errorMessage={errors.max_capacity?.message}
          required
        />
        <FormInput
          label="Regular Price"
          type="text"
          {...register('regular_price')}
          required
          errorMessage={errors.regular_price?.message}
        />
        <FormInput
          label="Discount"
          type="text"
          defaultValue={0}
          {...register('discount')}
          errorMessage={errors.discount?.message}
        />
        <FormTextarea containerClassName="col-span-2" label="Description For Website" {...register('description')} />

        <div className="col-span-2">
          <Label className="pb-1.5">Cabin Image</Label>
          <UploadImage
            name="image"
            id="image"
            errorMessage={typeof errors.image?.message === 'string' ? errors.image.message : undefined}
            setValue={setValue}
          />
        </div>
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
