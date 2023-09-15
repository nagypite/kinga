import type { Metadata } from 'next'
import { sql } from '@vercel/postgres'
import { format } from 'date-fns'

import { getDaysInInterval } from '@/lib/date'

export const meta: Metadata = {
  title: 'kinga',
  description: 'Közösségi Ingázás Gyakorlati Alkalmazása',
}

export type User = {
  email: string,
  name:  string,
  color: string
} | null

export type Day = {
  day: Date,
  special?: SpecialDate,
  skip?: boolean,
  trips: Trip[]
} | null

export type SpecialDate = {
  date: string,
  type: string,
  name: string
} | null

export type Trip = {
  id:     number,
  date:   string,
  label?: string,
  data: {
    who:    string[],
    stops: {
      where: string,
      when:  string
    }[],
    passengers?: string[],
    vehicle?: {
      name:  string,
      seats: number
    }
  }
} | null

export type ProcessedDayData = {
  days: Day[],
  users: Map<string, User>
}

export async function processIntervalDays(interval: Date[]): Promise<ProcessedDayData> {
  const users = new Map<string, User>()
  const days: Day[] = []

  for (let day of getDaysInInterval(interval)) {
    const date: string = format(day, 'yyyy-MM-dd')
    const specialDate: SpecialDate = await checkSpecialDate(date)
    const trips: Trip[] = await getTrips(date)
    const skip: boolean = (
      [0,6].includes(day.getDay()) ?
        specialDate?.type != 'workday' :
        specialDate?.type == 'holiday'
    )

    trips.forEach((trip) => (
      trip?.data.who.forEach(async (who) => (
        users.has(who) || (users.set(who, await getUser(who)))
      ))
    ))

    days.push({
      day: day,
      special: specialDate,
      skip: skip,
      trips: trips
    })
  }

  return {days, users}
}

export async function getUser(email: string): Promise<User | null> {
  const result = await sql`SELECT * FROM captain WHERE email = ${email}`

  if (!result.rows[0]) return null

  return (({email, name, color}) => ({email, name, color}))(result.rows[0])
}

export async function checkSpecialDate(date: string): Promise<SpecialDate | null>{
  const result = await sql`SELECT * FROM special_date WHERE day = ${date}`

  if (!result.rows[0]) return null

  return (({date, type, name}) => ({date, type, name}))(result.rows[0])
}

export async function getTrips(day: string): Promise<Trip[]> {
  const result = await sql`SELECT * FROM trip WHERE day = ${day}`

  return result.rows as Trip[]
}

export async function getTrip(id: number): Promise<Trip | null> {
  const result = await sql`SELECT * FROM trip WHERE id = ${id}`

  const trip = result.rows[0]??null
  if (!trip) return null

  const user = await getUser(trip.data?.who[0])
  trip.label = `${(user?.name)??'?'}@${trip.day}/${(trip.data?.stops[0]?.when)??'??:??'}`

  return trip as Trip
}

export const tripData = [
  {
    key: 'day',
    label: 'Dátum',
    get: (t: Trip) => (<span>{t?.date}</span>)
  },
  {
    key: 'user',
    label: 'Kapitány',
    get: async (t: Trip) => (
      <div>
        {(t?.data.who.map(async function(w) {
          const user = await getUser(w)

          return (
          <div key={`trip-${t.id}-${w}`} className={`tag bg-${(user?.color) ?? 'gray-200'}`}>
            {(user?.name) ?? w}
          </div>
          )
        }))}
      </div>
    ),
  },
  {
    key: 'stops',
    label: 'Megállók',
    get: (t: Trip) => (
      <>
        {(t?.data.stops.map((s) => (
          <div key={`trip-${t.id}-stop-${s.when}`}>
            <strong>{s.when}</strong>: {s.where}
          </div>
        )))}
      </>
    ),
  },
  {
    key: 'pass',
    label: 'Utasok',
    get: (t: Trip) => (
      <>
        {t?.data.passengers?.join(', ')}
      </>
    ),
  },
  {
    key: 'vehicle',
    label: 'Jármű',
    get: (t: Trip) => (
      <>
        {t?.data?.vehicle?.name} ({t?.data?.vehicle?.seats})
      </>
    ),
  },
]
