import { ChevronLeft } from '@mui/icons-material'

export const AuthBackButton = (props) => {
  return (
    <button
      {...props}
      className="group flex w-12 cursor-pointer items-center justify-center rounded-full border-0 bg-neutral-100 transition-colors hover:bg-rose-700">
      <ChevronLeft className="h-6 w-6 text-neutral-800 group-hover:text-white" />
    </button>
  )
}
