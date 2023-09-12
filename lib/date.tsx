export function getMonthInterval(start?: Date): Date[] {
  // default: now
  start || (start = new Date())

  // set time to zero
  start.setHours(12,0,0,0)

  // calculate first day of month
  let firstDay = new Date(start)
  console.log('firstDay', firstDay.toISOString())
  firstDay.setDate(1)

  // rewind to last Monday (or keep it at Sunday)
  console.log('rewind', firstDay.toISOString(), firstDay.getDay())
  if (firstDay.getDay() > 1) {
    firstDay.setDate(firstDay.getDate() - firstDay.getDay())
  }

  // calculate last day of month
  let lastDay = new Date(start)
  lastDay.setMonth(lastDay.getMonth()+1)
  lastDay.setDate(0)

  // forward to last Sunday (or keep it at Saturday)
  let lastDayOfWeek = lastDay.getDay()
  if (0 < lastDayOfWeek && lastDayOfWeek < 5) {
    lastDay.setDate(lastDay.getDate() - lastDayOfWeek + 6)
  }

  return [firstDay, lastDay]
}

export function getDaysInInterval(interval: Date[]): Date[] {
  let current = new Date(interval[0])
  let days = []

  while (current.getTime() < interval[1].getTime()) {
    current.setDate(current.getDate()+1)
    days.push(new Date(current))
  }

  return days
}
