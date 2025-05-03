import { ImagePlusIcon } from 'lucide-react'
import { InputHTMLAttributes, useState } from 'react'

import FormErrorPartial from '@/components/form/partials/FormError'
import { cn } from '@/lib/utils'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

export default function UploadImage({ errorMessage, ...props }: IProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<boolean>(false)

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    console.log(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    console.log(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  return (
    <>
      <input type="file" id="image_url" accept="image/*" className="hidden" onChange={handleFileChange} {...props} />

      <label
        htmlFor="image_url"
        className={cn(
          'flex justify-center items-center h-80 p-4 border border-dashed rounded-md cursor-pointer text-center',
          dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-400'
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <img className="h-full w-full object-cover rounded-md" src={previewUrl} />
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <ImagePlusIcon className="text-primary-500" size="48px" />
            <p className="text-sm">Click or drag an image to upload</p>
          </div>
        )}
      </label>
      <FormErrorPartial message={errorMessage} />
    </>
  )
}
