import { setDefaultOptions } from 'date-fns'
import { hu } from 'date-fns/locale'
setDefaultOptions({locale:hu})

import Schedules from '@/components/Schedules'
import NavMenu from '@/components/NavMenu'
import TripModal from '@/components/TripModal'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Beosztás', href: '#', current: true },
  { name: 'Statisztika', href: '#', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function Home({searchParams}) {
  const showTrip = searchParams?.trip
  return (
    <>
      <div className="min-h-full">
        <NavMenu navigation={navigation} userNavigation={userNavigation} user={user}/>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Beosztás</h2>
            <h3 className="text-xl font-bold text-gray-600">Szeptember</h3>
          </div>
        </header>
        <main className="bg-white text-black">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Schedules className="schedules" />
          </div>
        </main>
      </div>
    </>
  )
}
