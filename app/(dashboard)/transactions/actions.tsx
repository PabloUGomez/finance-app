'use client'

import { Button } from '@/components/ui/button'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useConfim } from '@/hooks/use-confirm'

type Props = {
  id: string
}

const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfim(
    'Are you sure?',
    'You are about to delete this transaction.'
  )

  const { onOpen } = useOpenTransaction()
  const deleteMutation = useDeleteTransaction(id)

  const handelDelete = async () => {
    const ok = await confirm()
    if (ok) {
      deleteMutation.mutate()
    }
  }
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() => onOpen(id)}
            disabled={deleteMutation.isPending}
          >
            <Edit className='mr-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handelDelete}
            disabled={deleteMutation.isPending}
          >
            <Trash className='mr-2 size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
export default Actions
