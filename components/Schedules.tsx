import {format, formatRelative, setDefaultOptions} from 'date-fns'
import { hu } from 'date-fns/locale'

import {users, scheduleData, specialDates} from '../lib/data.tsx'
import {getMonthInterval, getDaysInInterval} from '../lib/date.tsx'

setDefaultOptions({locale:hu})

export default function Schedules() {
  const interval = getMonthInterval()
  const now = new Date()
  const days = getDaysInInterval(interval).map(function(day) {
    const date = format(day, 'yyyy-MM-dd')

    return {
      day: day,
      special: specialDates[date],
      skip: [0,6].includes(day.getDay()) && specialDates[date]?.type != 'work',
      scheduled: scheduleData.filter((d) => d.date == date),
    }
  })

  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        {days.map((dayData) => (
          <li key={dayData.day.getTime()} className={`flex justify-between gap-x-6 p-5 ${dayData.skip?"bg-gray-200 font-gray-800":""}`}>
            <div className="w-24 flex-none">
              <span>{format(dayData.day, 'MM. dd.')}</span>&nbsp;
              <strong>{format(dayData.day, 'eeeee')}</strong>
            </div>
            <div className="flex flex-wrap grow gap-4 content-start">
            {dayData.scheduled.map((sched) => (
              <div key="{sched.id}" className={`rounded p-2 group transition-all duration-100 ease-out whitespace-nowrap ${users[sched.who[0]]?.color ?? 'bg-gray-200'}`}>
                <span>{sched.stops[0].when} - {sched.stops[sched.stops.length-1].when}</span>
                <span className="group-hover:inline">&nbsp;{sched.who.map((who) => users[who]?.name??'?').join(', ')}</span>
              </div>
            ))}
            </div>
            <div className="flex-none min-w-0">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">person.name</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">person.email</p>
              </div>
            </div>
            <div className="flex-none items-end">
              <p className="text-sm leading-6 text-gray-900">person.role</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <time dateTime={dayData.day.toISOString()}>{formatRelative(dayData.day, now)}</time>
                </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

