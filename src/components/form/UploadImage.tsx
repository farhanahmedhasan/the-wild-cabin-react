import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { ImagePlusIcon, X } from 'lucide-react'

import FormErrorPartial from '@/components/form/partials/FormError'
import { CabinSchemaType } from '@/schemas/cabinSchema'
import { Button } from '@/components/ui/Button'
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
      <div className="relative">
        <input type="file" className="hidden" accept="image/*" {...props} onChange={handleFileChange} ref={ref} />

        <label
          htmlFor="image"
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
            <img className="h-full w-full object-cover rounded-md" src={previewUrl ? previewUrl : imageUrl} />
          ) : (
            <div className="relative flex flex-col gap-2 items-center">
              <ImagePlusIcon className="text-primary-500" size="48px" />
              <p className="text-sm">Click or drag an image to upload</p>
            </div>
          )}
        </label>
        <FormErrorPartial message={errorMessage} />

        {(previewUrl || imageUrl) && (
          <Button
            variant="secondary"
            type="button"
            size="sm"
            className="absolute right-6 top-6"
            onClick={(e) => {
              e.stopPropagation()
              setPreviewUrl(undefined)
              setValue('image', null)
            }}
          >
            <X className="h-4 w-4 text-primary-600" strokeWidth="4" />
          </Button>
        )}
      </div>
    )
  }
)

export default UploadImage
