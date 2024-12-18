import { Box } from '@mui/material'
import { useEffect } from 'react'

const DropZoneInput = ({ selectedFile, setSelectedFile }) => {
  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  useEffect(() => {
    if (selectedFile instanceof File) {
      const output = document.getElementById('image-preview')
      output.src = URL.createObjectURL(selectedFile)
      output.onload = () => URL.revokeObjectURL(output.src)
    }
  }, [selectedFile])

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <Box
        className="w-full rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center text-sm shadow-md hover:border-rose-400"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}>
        <div className="mb-2 text-gray-700">Drag & Drop Your File Here</div>
        <div className="mb-4 text-gray-500">or click to browse</div>
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer rounded bg-rose-500 px-4 py-2 text-white hover:bg-rose-400">
          Browse File
        </label>
      </Box>
      {selectedFile && (
        <img
          id="image-preview"
          className={`mt-4 h-48 w-auto rounded-lg object-contain sm:col-span-3`}
          alt="Logo Preview"
          src={selectedFile ?? '/images/image-placeholder.webp'}
        />
      )}
    </div>
  )
}

export default DropZoneInput
