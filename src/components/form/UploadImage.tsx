import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { ImagePlusIcon } from 'lucide-react'

import FormErrorPartial from '@/components/form/partials/FormError'
import { CabinSchemaType } from '@/schemas/cabinSchema'
import { cn } from '@/lib/utils'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  setValue: UseFormSetValue<CabinSchemaType>
  imageUrl?: string | undefined
}

const UploadImage = React.forwardRef<HTMLInputElement, IProps>(
  ({ errorMessage, setValue, imageUrl, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)
    const [dragOver, setDragOver] = useState<boolean>(false)

    function handleFile(file: File) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setValue('image', file ? [file] : [], { shouldValidate: true })
    }

    function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
      e.preventDefault()
      setDragOver(false)

      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    }

    useEffect(() => {
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl)
      }
    }, [previewUrl])

    return (
      <>
        <input type="file" className="hidden" accept="image/*" {...props} onChange={handleFileChange} ref={ref} />

        <label
          htmlFor="image_url"
          className={cn(
            'flex justify-center items-center h-80 p-4 border border-dashed rounded-md cursor-pointer text-center',
            dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-400 bg-gray-50'
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {previewUrl || imageUrl ? (
            <img className="h-full w-full object-cover rounded-md" src={imageUrl || previewUrl} />
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
)

export default UploadImage
