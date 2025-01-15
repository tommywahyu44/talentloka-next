import { moneyFormat } from '@/lib/helpers'
import { TextField } from '@mui/material'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function TextInput({
  label,
  id,
  value,
  onChange,
  errorEmptyMessage,
  isSubmit,
  max,
  min,
  note,
  isFullWidth = false,
  type = 'text',
  editable = true,
  placeholder = 'Enter your text here',
}) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const togglePassword = () => setShowPassword(!showPassword)

  const passwordIcon = isPassword && (
    <button
      type="button"
      onClick={togglePassword}
      className="cursor-pointer border-0 bg-transparent text-gray-500 hover:text-gray-600 focus:outline-none">
      {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
    </button>
  )

  const getInput = () => {
    if (!editable) {
      return <h5 className="text-sm font-semibold sm:text-base">{value}</h5>
    } else if (type === 'textarea') {
      return (
        <textarea
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          rows={3}
          required
          className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-600 focus:ring-rose-600 sm:text-base"
        />
      )
    } else if (type === 'money') {
      const money = moneyFormat(value)
      return (
        <div>
          <TextField
            type="text"
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            fullWidth
            variant="standard"
            placeholder={placeholder}
            InputProps={{
              className: 'border-b border-gray-300 text-sm',
            }}
            InputLabelProps={{
              shrink: true,
              className: 'text-gray-800',
              style: { color: '#334155' },
            }}
          />
          <h5 className="mt-1 text-xs font-semibold text-gray-500">{money}</h5>
        </div>
      )
    } else {
      return (
        <TextField
          type={inputType}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          fullWidth
          variant="standard"
          placeholder={placeholder}
          InputProps={{
            endAdornment: passwordIcon,
            className: 'border-b border-gray-300 text-sm',
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
              pb: 1.5,
              pt: 1,
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
  }

  return (
    <div className={isFullWidth ? 'sm:col-span-6' : 'sm:col-span-3'}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="mt-2">{getInput()}</div>
      <p className="mt-1 text-sm text-gray-500">
        {note}
        <span className="text-red-600">{value === '' && isSubmit ? errorEmptyMessage : ''}</span>
      </p>
    </div>
  )
}
