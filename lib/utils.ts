import { type ClassValue, clsx } from 'clsx'
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
