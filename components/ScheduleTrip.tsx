import 'server-only'

import Link from 'next/link'
import { format } from 'date-fns'

export default function ScheduleTrip({trip, users}) {
  return (
    <Link href={`/trip/${trip.id}`}>
      <div key={trip.id} className={`tag group transition-all duration-100 ease-out bg-${users.get(trip.data.who[0])?.color ?? 'gray-200'}`}>
        <span>{trip.data.stops[0].when} - {trip.data.stops[trip.data.stops.length-1].when}</span>
        <span className="group-hover:inline">&nbsp;{trip.data.who.map((who) => (users.get(who)?.name) ?? who).join(', ')}</span>
      </div>
    </Link>
  )
}
