import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  categoryId: string | null
  category: string | null
}

export const CategoryColumn = ({ categoryId, category }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory()

  const onClick = () => {
    if (!categoryId) return
    onOpenCategory(categoryId)
  }

  return (
    <div
      className={cn(
        'flex items-center cursor-pointer hover:underline',
        !category && 'text-rose-500'
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className='mr-2 size-4 shrink-0'/>}
      {category || 'Uncategorized'}
    </div>
  )
}
