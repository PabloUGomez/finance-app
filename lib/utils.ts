import { type ClassValue, clsx } from 'clsx'
import { eachDayOfInterval, isSameDay } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000)
}

export function convertMiliunitsToAmount(miliunits: number) {
  return miliunits / 1000
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function calculatePercentageChange(current: number, previus: number) {
  if (previus === 0) {
    return previus === current ? 0 : 100
  }

  return ((current - previus) / previus) * 100
}

export function fillMissingDays(
  activeDays: {
    date: Date
    income: number
    expenses: number
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return []
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate })
  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((activeDay) => isSameDay(activeDay.date, day))
    if (found) {
      return found
    } else {
      return { date: day, income: 0, expenses: 0 }
    }
  })
  return transactionsByDay
}
