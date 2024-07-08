'use client'

import { Button } from '@/components/ui/button'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'

export default function Home() {
  const {  onOpen } = useNewCategory()
  return (
    <main>
      <Button onClick={onOpen}>
        Add an account
      </Button>
    </main>
  )
}
