import { setDefaultOptions } from 'date-fns'
import { hu } from 'date-fns/locale'
setDefaultOptions({locale:hu})

import { notFound } from 'next/navigation'
import Link from 'next/link'

import NavMenu from '@/components/NavMenu'
import TripDetails from '@/components/TripDetails'
import { getTrip } from '@/lib/data'

type Params = {
  id:  number,
}

export default async function TripPage({params}: {params: Params}) {
  const trip = await getTrip(params.id)

  if (!trip) notFound()

  return (
    <>
      <div className="min-h-full">
        <NavMenu />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Utazás</h2>
            <h3 className="text-xl font-bold text-gray-600">{trip.label}</h3>
            <div className="my-4">
              <Link href="/">
                <span className="btn">&larr; Vissza</span>
              </Link>
            </div>
          </div>
        </header>
        <TripDetails trip={trip} />
      </div>
    </>
  )
}
