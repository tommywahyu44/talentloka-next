import { TextField } from '@mui/material'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function AuthInput({ InputProps, type, ...props }) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const togglePassword = () => setShowPassword(!showPassword)

  const passwordIcon = isPassword && (
    <button
      type="button"
      onClick={togglePassword}
      className="cursor-pointer border-0 bg-white text-gray-500 hover:text-gray-600 focus:outline-none">
      {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
    </button>
  )

  return (
    <TextField
      {...props}
      type={inputType}
      fullWidth
      variant="standard"
      className="ring-0"
      InputProps={{
        ...InputProps,
        endAdornment: passwordIcon,
        className: 'border-b border-gray-200 text-sm',
      }}
      InputLabelProps={{
        shrink: true,
        className: 'text-gray-800',
        style: { color: '#334155' },
      }}
      sx={{
        '& .MuiInput-root': {
          '&:before': { borderBottom: '1px solid #E5E7EB' },
          '&:after': { borderBottom: '2px solid #ef4444' },
          '&:hover:not(.Mui-disabled):before': { borderBottom: '1px solid #E5E7EB' },
        },
        '& .MuiInputBase-input': {
          py: 1,
          '&::placeholder': {
            color: '#9CA3AF',
            opacity: 1,
            fontSize: '0.875rem',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        },
        '& MuiFormLabel-filled': {
          borderColor: 'transparent',
        },
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },
        },
      }}
    />
  )
}
