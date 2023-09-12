import type { Metadata } from 'next'

export const meta: Metadata = {
  title: 'kinga',
  description: 'Közösségi Ingázás Gyakorlati Alkalmazása',
}

export const users = {
  'nanatodo@gmail.com': {
    name: 'Betti',
    color: 'bg-yellow-400'
  },
  'madarasiedo@gmail.com': {
    name: 'Edó',
    color: 'bg-orange-400'
  },
  'kordaskati@gmail.com': {
    name: 'Kordás Kati',
    color: 'bg-green-400'
  },
  'miniabc2017@gmail.com': {
    name: 'Papp Kati',
    color: 'bg-green-400'
  },
  'matekaja@gmail.com': {
    name: 'Máté',
    color: 'bg-indigo-400'
  },
  'kriwiati@gmail.com': {
    name: 'Attila',
    color: 'bg-sky-400'
  },
}

export const scheduleData = [
  {
    date: '2023-09-11',
    who: ['madarasiedo@gmail.com'],
    stops: [
      { where: 'Kistelek, vonatállomás', when: '07:11'},
      { where: 'Kiskunfélegyháza, Tiszta Forrás', when: '07:41'},
    ],
    passengers: ['Csenge', 'Bíbus', 'Ákos'],
    vehicle: {
      name: 'autó',
      seats: 5,
    },
    retour: true,
  },
  {
    date: '2023-09-11',
    who: ['nanatodo@gmail.com','kordaskati@gmail.com'],
    stops: [
      { where: 'Ópusztaszer, Árpád vendéglő', when: '07:20'},
      { where: 'Kiskunfélegyháza, Tiszta Forrás', when: '07:50'},
    ],
    passengers: ['Boti', 'Matyi', 'Ádi', 'Berci', 'Bori', 'Ábel'],
    vehicle: {
      name: 'kisbusz',
      seats: 9,
    },
  },
  {
    date: '2023-09-11',
    who: ['nanatodo@gmail.com','kordaskati@gmail.com'],
    stops: [
      { where: 'Kiskunfélegyháza, Tiszta Forrás', when: '14:00'},
      { where: 'Kistelek, vonatállomás', when: '14:30'},
    ],
    passengers: ['Boti', 'Matyi', 'Ádi', 'Berci', 'Bori', 'Ábel'],
    vehicle: {
      name: 'kisbusz',
      seats: 9,
    },
  },
  {
    date: '2023-09-11',
    who: ['nanatodo@gmail.com','kordaskati@gmail.com'],
    stops: [
      { where: 'Kiskunfélegyháza, Tiszta Forrás', when: '14:30'},
      { where: 'Kistelek, vonatállomás', when: '15:00'},
    ],
    passengers: ['Csenge', 'Bíbus', 'Ákos'],
    vehicle: {
      name: 'autó',
      seats: 5,
    },
  },
  {
    date: '2023-09-12',
    who: ['matekaja@gmail.com'],
    stops: [
      { where: 'Kistelek, vonatállomás', when: '07:11'},
      { where: 'Kiskunfélegyháza, Tiszta Forrás', when: '07:31'},
    ],
    passengers: ['Csenge', 'Bíbus'],
    vehicle: {
      name: 'vonat',
      seats: 8,
    },
  },
  {
    date: '2023-09-12',
    who: ['kriwiati@gmail.com'],
    stops: [
      { where: 'Kiskunfélegyháza, Tiszta Forrás', when: '15:30'},
      { where: 'Kistelek, vonatállomás', when: '15:50'},
    ],
    passengers: ['Ákos'],
    vehicle: {
      name: 'vonat',
      seats: 8,
    },
  },
]

export const specialDates = {
  '2023-10-30': {
    type: 'holiday',
    name: 'Őszi szünet',
  },
  '2023-10-31': {
    type: 'holiday',
    name: 'Őszi szünet',
  },
  '2023-11-01': {
    type: 'holiday',
    name: 'Őszi szünet',
  },
  '2023-11-02': {
    type: 'holiday',
    name: 'Őszi szünet',
  },
  '2023-11-03': {
    type: 'holiday',
    name: 'Őszi szünet',
  },
}
