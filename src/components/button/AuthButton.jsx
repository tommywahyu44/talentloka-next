import { Button } from '@mui/material'
import clsx from 'clsx'

export const AuthButton = (props) => {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: '8px',
        textTransform: 'none',
        fontSize: '18px',
        boxShadow: 'none',
        backgroundColor: '#ef4444',
        marginTop: '12px',
      }}
      fullWidth
      variant="contained"
      className={clsx(
        'flex h-11 flex-shrink-0 items-center justify-center gap-2 self-stretch px-5 py-4 font-medium hover:bg-rose-800',
        props.color
          ? props.color === 'secondary'
            ? 'bg-gray-200 text-gray-900 hover:text-white'
            : 'bg-rose-500'
          : 'bg-rose-500'
      )}>
      {props.children}
    </Button>
  )
}
