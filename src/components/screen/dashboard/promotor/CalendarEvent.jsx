import * as React from 'react'
import dayjs from 'dayjs'
import Badge from '@mui/material/Badge'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'

export default function CalendarEvent({ listEvents }) {
  const initialValue = dayjs() // Use current date as initial value

  const EventDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props

    const event = listEvents.find((e) => dayjs(e.startDate).isSame(day, 'day'))

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          event && (
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500"></span>
            </span>
          )
        }>
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          sx={{
            ...(event && {
              '& .MuiPickersDay-root': {
                '&.Mui-selected': {
                  backgroundColor: '#e11d48',
                  color: 'white',
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: '#e11d48',
                  },
                },
              },
            }),
            '&.MuiPickersDay-root.Mui-selected': {
              backgroundColor: '#e11d48',
              color: 'white',
            },
          }}
        />
      </Badge>
    )
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{ day: EventDay }}
        sx={{
          '& .MuiPickersCalendarHeader-label': {
            color: '#9f1239',
            fontWeight: 500,
            fontSize: '1.125rem',
          },
          '& .MuiIconButton-root': {
            color: 'rgb(107 114 128)',
          },
          '& .MuiPickersDay-root': {
            '&:hover': {
              opacity: 0.7,
            },
            '&.Mui-selected': {
              color: 'white',
            },
          },
          '& .MuiPickersYear-root': {
            color: 'black',
          },
          '& .MuiPickersYear-yearButton.Mui-selected': {
            backgroundColor: '#e11d48',
          },
        }}
        className="rounded-md bg-gradient-to-br from-rose-50/50 to-rose-50/80 shadow-sm"
      />
    </LocalizationProvider>
  )
}
