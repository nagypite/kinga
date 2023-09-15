import { tripData } from '@/lib/data.tsx'

export default function TripDetails({trip}) {
  return (
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
  )
}
