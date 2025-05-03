import { ImagePlusIcon } from 'lucide-react'

import FormErrorPartial from '@/components/form/partials/FormError'

interface IProps {
  errorMessage?: string
}

export default function UploadImage(props: IProps) {
  return (
    <>
      <input type="file" id="image_url" className="hidden" onChange={(e) => console.log(e)} />

      <label
        htmlFor="image_url"
        className=" flex justify-center items-center h-60 p-4 border border-dashed rounded-md border-gray-400 cursor-pointer text-center"
      >
        <div className="flex flex-col gap-2 items-center">
          <ImagePlusIcon className="text-primary-500" size="48px" />
          <p className="text-sm">Click or drag an image to upload</p>
          <FormErrorPartial message={props.errorMessage} />
        </div>
      </label>
    </>
  )
}
