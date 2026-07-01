"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type ImagePickerProps = {
  onImageSelect?: (files: File[]) => void
}

export function ImagePicker({ onImageSelect }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  function addFiles(newFiles: File[]) {
    if (newFiles.length === 0) return

    const updatedFiles = [...files, ...newFiles]
    const updatedPreviews = [
      ...previews,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]

    setFiles(updatedFiles)
    setPreviews(updatedPreviews)

    onImageSelect?.(updatedFiles)
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(previews[index])

    const updatedFiles = files.filter((_, i) => i !== index)
    const updatedPreviews = previews.filter((_, i) => i !== index)

    setFiles(updatedFiles)
    setPreviews(updatedPreviews)

    onImageSelect?.(updatedFiles)
  }

  return (
    <div className="space-y-4">
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(Array.from(e.target.files ?? []))
          e.target.value = ""
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          addFiles(Array.from(e.dataTransfer.files))
        }}
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <p className="text-sm text-muted-foreground">
          Arraste imagens aqui ou clique para selecionar
        </p>

        <Button
          type="button"
          variant="secondary"
          className="mt-4"
        >
          Escolher imagens
        </Button>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden border"
            >
              <img
                src={preview}
                alt={`Imagem ${index + 1}`}
                className="w-full h-32 object-cover"
              />

              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(index)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}