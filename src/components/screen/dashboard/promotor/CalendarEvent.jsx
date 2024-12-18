import { getStyleInvitationStatus, getTextInvitationStatus } from '@/lib/statusUtils'
import Badge from '@mui/material/Badge'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import clsx from 'clsx'
import dayjs from 'dayjs'
import * as React from 'react'

export default function CalendarEvent({ listEvents, profileData }) {
  const [selectedDate, setSelectedDate] = React.useState(dayjs()) // State for selected date

  const filteredEventsCalendar = listEvents.map((event) => {
    const statusPromotor = event?.listPromotor?.find((item) => item?.spgCode === profileData?.code)
    return {
      title: event?.title,
      startDate: event?.startDate,
      endDate: event?.endDate,
      status: statusPromotor?.invitationStatus ?? '',
    }
  })

  const eventsForSelectedDate = filteredEventsCalendar.filter((e) =>
    dayjs(e.startDate).isSame(selectedDate, 'day')
  )

  const initialValue = dayjs() // Use current date as initial value

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const EventDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props

    const event = filteredEventsCalendar.find((e) => dayjs(e.startDate).isSame(day, 'day'))
    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          event && (
            <span className="relative flex h-3 w-3">
              <span
                className={clsx(
                  getStyleInvitationStatus(event.status),
                  'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'
                )}></span>
              <span
                className={clsx(
                  getStyleInvitationStatus(event.status),
                  'relative inline-flex h-3 w-3 rounded-full'
                )}></span>
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
    <div className="h-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          value={selectedDate} // Bind selected date
          onChange={handleDateChange} // Listener for date selection
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

      <div className="mt-4">
        {eventsForSelectedDate.length > 0 ? (
          <ul className="mt-2 list-inside list-disc text-left text-xs text-gray-700">
            {eventsForSelectedDate.map((event, index) => (
              <li
                key={index}
                className="mb-4">
                <span
                  className={clsx(
                    getStyleInvitationStatus(event.status),
                    'mr-2 rounded-md px-2 py-1.5 text-white'
                  )}>
                  {getTextInvitationStatus(event.status)}
                </span>
                <strong>{event.title}</strong> - {dayjs(event.startDate).format('hh:mm A')}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-xs text-gray-500">No events for this date.</p>
        )}
      </div>
    </div>
  )
}
