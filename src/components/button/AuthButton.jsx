import { Button } from '@mui/material'
import clsx from 'clsx'

export const AuthButton = (props) => {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: '999px',
        textTransform: 'none',
        fontSize: '16px',
        boxShadow: 'none',
        backgroundColor: '#ef4444',
        marginTop: props.marginTop ?? 0,
      }}
      fullWidth
      variant="contained"
      className={clsx(
        'flex h-11 flex-shrink-0 items-center justify-center gap-2 self-stretch px-3 py-4 font-medium hover:bg-rose-700',
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
