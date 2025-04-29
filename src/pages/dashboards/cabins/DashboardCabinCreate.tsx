import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'

export default function DashboardCabinCreate() {
  return (
    <form className="font-poppins space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Cabin Name" name="name" required />
        <FormInput label="Maximum Capacity" name="max_capacity" required />
        <FormInput label="Regular Price" name="regular_price" required />
        <FormInput label="Discount" name="discount" />
        <FormInput containerClassName="col-span-2" label="Description For Website" name="description" />
        <FormInput containerClassName="col-span-2" label="Cabin Photo" name="image_url" />
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="secondary">
          Reset
        </Button>
        <Button size="sm">Add New Cabin</Button>
      </div>
    </form>
  )
}
