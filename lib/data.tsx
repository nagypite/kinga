import type { Metadata } from 'next'
import { sql } from '@vercel/postgres'
import { format } from 'date-fns'

import { getDaysInInterval } from '../lib/date.tsx'

export const meta: Metadata = {
  title: 'kinga',
  description: 'Közösségi Ingázás Gyakorlati Alkalmazása',
}

export interface User {
  email: String,
  name:  String,
  color: String
}

export interface Day {
  day: Date,
  special?: SpecialDate,
  skip?: Boolean,
  trips: Trip[]
}

export interface SpecialDate {
  date: String,
  type: String,
  name: String
}

export interface Trip {
  id:     Integer,
  date:   String,
  label?: String,
  who:    User[],
  stops: {
    where: String,
    when:  String
  }[],
  passengers?: String[],
  vehicle?: {
    name:  String,
    seats: Integer
  }
}

export async function processIntervalDays(interval: Date[]): {days:Day[],users:Map} {
  const users = new Map<string, User>()
  const days: Day[] = []

  for (let day of getDaysInInterval(interval)) {
    const date: String = format(day, 'yyyy-MM-dd')
    const specialDate: SpecialDate = await checkSpecialDate(date)
    const trips: Trip[] = await getTrips(date)
    const skip: Boolean = (
      [0,6].includes(day.getDay()) ?
        specialDate?.type != 'workday' :
        specialDate?.type == 'holiday'
    )

    trips.forEach((trip) => (
      trip.data.who.forEach(async (who) => (
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

export async function getUser(email: String) {
  const result = await sql`SELECT * FROM captain WHERE email = ${email}`

  return result.rows[0]??null
}

export async function checkSpecialDate(date: String): SpecialDate {
  const result = await sql`SELECT * FROM special_date WHERE day = ${date}`

  return result.rows[0]??null
}

export async function getTrips(day: String) {
  const result = await sql`SELECT * FROM trip WHERE day = ${day}`

  return result.rows
}

export async function getTrip(id: Integer) {
  const result = await sql`SELECT * FROM trip WHERE id = ${id}`

  const trip = result.rows[0]??null
  if (!trip) return null

  const user = await getUser(trip.data?.who[0])
  trip.label = `${(user?.name)??'?'}@${trip.day}/${(trip.data?.stops[0]?.when)??'??:??'}`

  return trip
}

export const tripData = [
  {
    key: 'day',
    label: 'Dátum',
    get: (t) => (<span>{t.day}</span>)
  },
  {
    key: 'user',
    label: 'Kapitány',
    get: async (t) => (
      <div>
        {(t.data.who.map(async function(w) {
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
    get: (t) => (
      <>
        {(t.data.stops.map((s) => (
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
    get: (t) => (
      <>
        {t.data.passengers.join(', ')}
      </>
    ),
  },
  {
    key: 'vehicle',
    label: 'Jármű',
    get: (t) => (
      <>
        {t.data?.vehicle.name} ({t.data?.vehicle.seats})
      </>
    ),
  },
]
