import 'server-only'

import { format } from 'date-fns'

import ScheduleTrip from './ScheduleTrip'

import type {Trip, User, Day} from '@/lib/data'

type Params = {
  dayData: Day,
  users: Map<string,User>,
}

export default function ScheduleDay({dayData, users}: Params) {
  return (
    <li key={dayData?.day.getTime()}
    className={`flex justify-between gap-x-6 p-5 ${dayData?.skip?"bg-gray-200 font-gray-800":""}`}>
      <div className="w-24 flex-none">
        <span>{(dayData?.day.getMonth()??0)+1}. {dayData?.day.getDate()}.</span>&nbsp;
        <strong>{dayData?.day ? format(dayData?.day, 'eeeee') : '?'}</strong>
      </div>
      <div className="flex flex-wrap grow gap-4 content-start">
      {dayData?.trips.map((trip: Trip) => (
        <ScheduleTrip key="{`trip-${trip.id}`}" trip={trip} users={users} />
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
            <time dateTime={dayData?.day.toISOString()}>{dayData?.day.toISOString()}</time>
          </p>
      </div>
    </li>
  )
}

