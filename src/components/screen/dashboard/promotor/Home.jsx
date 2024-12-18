'use client'

import DetailEvent from '@/components/screen/dashboard/promotor/DetailEvent'
import ListEvents from '@/components/screen/dashboard/promotor/ListEvents'
import { classNames, moneyFormat } from '@/lib/helpers'
import { BanknotesIcon, CurrencyDollarIcon, WalletIcon } from '@heroicons/react/24/outline'
import { styled } from '@mui/material/styles'
import { PieChart } from '@mui/x-charts'
import { useDrawingArea } from '@mui/x-charts/hooks'
import React, { useEffect, useState } from 'react'
import CalendarEvent from './CalendarEvent'

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}))

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea()
  return (
    <StyledText
      x={left + width / 2}
      y={top + height / 2}>
      {children}
    </StyledText>
  )
}

function PieCenterLabelMobile({ children }) {
  const { width, height, left, top } = useDrawingArea()
  return (
    <StyledText
      x={left + width / 1.3}
      y={top + height / 2.6}>
      {children}
    </StyledText>
  )
}

const events = [
  {
    date: '2024-12-02',
    title: 'Automotive Event',
    description: 'The Future of Automotive Innovation.',
  },
  {
    date: '2024-12-05',
    title: 'Tech Expo',
    description: 'Exploring Cutting-Edge Technology in Electronics.',
  },
  { date: '2024-12-10', title: 'Beauty Expo', description: 'The Ultimate Cosmetic Showcase.' },
]

const colors = ['#fb7185', '#db2777', '#991b1b', '#ef4444', '#be185d', '#881337']

export default function Home({ profileData, listEvents, setNavigation }) {
  const [detailEvent, setDetailEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const filteredEvents = listEvents.filter(
    (event) =>
      event?.listPromotor &&
      event?.listPromotor?.find((item) => {
        return item?.spgCode === profileData?.code
      })
  )

  // Count occurrences of each industry
  const industryCounts = filteredEvents.reduce((acc, event) => {
    acc[event.industry] = (acc[event.industry] || 0) + 1
    return acc
  }, {})

  // Convert counts to pie chart data format
  const pieChartData = Object.entries(industryCounts).map(([key, value], index) => ({
    id: key,
    value,
    label: key,
    color: colors[index % colors.length],
  }))

  const [kpi, setKpi] = useState([
    {
      id: 1,
      name: 'Wallet',
      stat: 0,
      icon: WalletIcon,
    },
    {
      id: 2,
      name: 'Total Earnings',
      stat: 0,
      icon: CurrencyDollarIcon,
    },
    {
      id: 3,
      name: 'Monthly Earnings',
      stat: 0,
      icon: BanknotesIcon,
    },
  ])

  const fetchKpi = () => {
    const events = profileData.events
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    // Calculate Total Earnings
    const totalEarnings = () => {
      return events
        .filter((event) => event.statusFee === 'PAID')
        .reduce((total, event) => total + event.fee, 0)
    }

    // Calculate This Month's Earnings
    const monthlyEarnings = () => {
      return events
        .filter((event) => {
          const eventDate = new Date(parseInt(event.timestamp, 10))
          return (
            event.statusFee === 'PAID' &&
            eventDate.getMonth() === currentMonth &&
            eventDate.getFullYear() === currentYear
          )
        })
        .reduce((total, event) => total + event.fee, 0)
    }

    setKpi([
      { ...kpi[0], stat: moneyFormat(profileData.wallet) },
      { ...kpi[1], stat: moneyFormat(totalEarnings()) },
      { ...kpi[2], stat: moneyFormat(monthlyEarnings()) },
    ])
  }

  // eslint-disable-next-line react/display-name
  const PieChartWidget = React.memo(({ data }) => {
    return (
      <div className="h-[28rem] items-center justify-center rounded-lg py-4 pr-0 text-center shadow sm:px-8 md:pr-4 xl:pl-4">
        <div className="hidden h-full sm:flex md:flex-row xl:flex-col">
          {data.length > 0 && (
            <PieChart
              series={[
                {
                  data: data,
                  innerRadius: 60,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={400}
              height={300}
              className="m-auto">
              <PieCenterLabel>{data.length} events</PieCenterLabel>
            </PieChart>
          )}

          <CalendarEvent
            listEvents={listEvents}
            profileData={profileData}
          />
        </div>
        <div className="block space-y-8 sm:hidden">
          {data.length > 0 && (
            <PieChart
              series={[
                {
                  data: data,
                  innerRadius: 60,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={300}
              height={400}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: 0,
                },
              }}
              className="mx-auto">
              <PieCenterLabelMobile>{data.length} events</PieCenterLabelMobile>
            </PieChart>
          )}
          <CalendarEvent
            listEvents={listEvents}
            profileData={profileData}
          />
        </div>
      </div>
    )
  })

  useEffect(() => {
    fetchKpi()
  }, [])

  return (
    <>
      {detailEvent ? (
        <DetailEvent
          event={detailEvent}
          profileData={profileData}
          back={() => setDetailEvent(null)}
        />
      ) : (
        <div className="gap-6 xl:grid xl:grid-cols-3">
          <div className="col-span-2">
            <div>
              <dl className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                {kpi.map((item) => (
                  <div
                    key={item.id}
                    className={classNames(
                      item.id === 1
                        ? 'col-span-2 bg-gradient-to-br from-rose-800 via-rose-900 to-rose-800 lg:col-span-1'
                        : 'bg-white',
                      'relative overflow-hidden rounded-lg px-4 pt-5 shadow sm:px-6 sm:pt-6'
                    )}>
                    <dt>
                      <div
                        className={classNames(
                          item.id !== 1 ? 'hidden bg-rose-500 md:block' : 'bg-white',
                          'absolute rounded-md p-3'
                        )}>
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.id !== 1 ? 'text-white' : 'text-rose-500',
                            'h-6 w-6'
                          )}
                        />
                      </div>
                      <p
                        className={classNames(
                          item.id !== 1 ? 'text-gray-500 md:ml-16' : 'ml-16 text-rose-50',
                          'truncate text-xs font-medium lg:text-sm'
                        )}>
                        {item.name}
                      </p>
                    </dt>
                    <dd
                      className={classNames(
                        item.id !== 1 ? 'text-gray-900 md:ml-16' : 'ml-16 text-white',
                        'flex items-baseline pb-6 sm:pb-7'
                      )}>
                      <h1 className="text-lg font-semibold lg:text-xl">
                        {item.prefix} {item.stat}
                      </h1>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6 block xl:hidden">
              <PieChartWidget data={pieChartData} />
            </div>
            <ListEvents
              title="Public Events"
              detailEvent={setDetailEvent}
              profileData={profileData}
              setNavigation={setNavigation}
              events={listEvents.filter((item) => item.type === 'Public')}
            />
            <ListEvents
              title="Your Upcoming Events"
              detailEvent={setDetailEvent}
              profileData={profileData}
              setNavigation={setNavigation}
              events={filteredEvents.filter((item) => item.status !== 'COMPLETED')}
            />
          </div>
          <div className="hidden xl:col-span-1 xl:block">
            <PieChartWidget data={pieChartData} />
          </div>
        </div>
      )}
    </>
  )
}
