import { setDefaultOptions } from 'date-fns'
import { hu } from 'date-fns/locale'
setDefaultOptions({locale:hu})

import { notFound } from 'next/navigation'

import TripModal from '@/components/TripModal'

export default async function TripPage({params}) {
  return (
    <TripModal id={params.id}/>
  )
}

