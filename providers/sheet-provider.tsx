'use client'

import { useMountedState } from 'react-use'
import { NewAccountSheet } from '@/features/accounts/_components/new-account-sheet'
import { EditAccountSheet } from '@/features/accounts/_components/edit-account-sheet'
import { NewCategorySheet } from '@/features/categories/_components/new-category-sheet'
import { EditCategorySheet } from '@/features/categories/_components/edit-category-sheet'
export const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) {
    return null
  }
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  )
}
