import ContentCopy from '@mui/icons-material/ContentCopy'

const CopyButton = ({ textToCopy }) => {
  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert(`Text copied to clipboard: ${textToCopy}`)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <ContentCopy
      onClick={handleCopy}
      className="h-6 w-6 cursor-pointer text-gray-400 hover:text-rose-500"></ContentCopy>
  )
}

export default CopyButton
