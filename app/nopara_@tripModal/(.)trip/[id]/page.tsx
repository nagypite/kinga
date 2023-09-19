import { setDefaultOptions } from 'date-fns'
import { hu } from 'date-fns/locale'
setDefaultOptions({locale:hu})

import TripModal from '@/components/TripModal'

type Params = {
  id:  number,
}

export default async function TripPage({params}: {params: Params}) {
  return (
    <TripModal id={params.id}/>
  )
}

