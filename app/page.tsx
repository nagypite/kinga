import { setDefaultOptions } from 'date-fns'
import { hu } from 'date-fns/locale'
setDefaultOptions({locale:hu})

import Schedules from '@/components/Schedules'
import NavMenu from '@/components/NavMenu'

export default function Home() {
  return (
    <>
      <div className="min-h-full">
        <NavMenu />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Beosztás</h2>
            <h3 className="text-xl font-bold text-gray-600">Szeptember</h3>
          </div>
        </header>
        <main className="bg-white text-black">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Schedules />
          </div>
        </main>
      </div>
    </>
  )
}
