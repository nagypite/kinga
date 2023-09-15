import { notFound } from 'next/navigation'

import { getTrip } from '@/lib/data'
import Modal from '@/components/Modal'
import TripDetails from '@/components/TripDetails'

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
      <TripDetails trip={trip} />
    </Modal>
  )
}


