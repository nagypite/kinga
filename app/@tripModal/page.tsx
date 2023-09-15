import { setDefaultOptions } from 'date-fns'
import { hu } from 'date-fns/locale'
setDefaultOptions({locale:hu})

import { notFound } from 'next/navigation'

import { getTrip, getUser, tripData } from '@/lib/data.tsx'
import Modal from '@/components/Modal'

export default async function TripModal(params) {
  const trip = await getTrip(params.id)
  if (!trip) notFound()

  return (
    <Modal>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Utazás</h2>
          <h3 className="text-xl font-bold text-gray-600">{trip.label}</h3>
        </div>
      </header>
      <main className="bg-white text-black">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {(tripData.map((trd) => (
          <div key={`trip-${trip.id}-data-${trd.key}`} className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 md:grid-cols-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">{trd.label}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:col-span-3">{trd.get(trip)}</dd>
              </div>
            </dl>
          </div>
          )))}
        </div>
      </main>
    </Modal>
  )
}

