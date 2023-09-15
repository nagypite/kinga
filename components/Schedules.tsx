import 'server-only'

import { getMonthInterval } from '@/lib/date'
import { processIntervalDays } from '@/lib/data'

import ScheduleDay from './ScheduleDay'

async function getSchedule() {
  const interval: Date[] = getMonthInterval()
  return processIntervalDays(interval)
}

export default async function Schedules() {
  const schedule = await getSchedule()
  const days = schedule.days
  const users = schedule.users

  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        {days.map((dayData) => (
          <ScheduleDay key="{`day-${dayData.date.getTime()}`}" dayData={dayData} users={users}/>
        ))}
      </ul>
    </>
  )
}

