'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useConfirm } from '@/hooks/use-confirm'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'

interface ActionsProps {
  id: string
}

export function Actions({ id }: ActionsProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this transaction.',
  )

  const { onOpen } = useOpenTransaction()

  const deleteMutation = useDeleteTransaction(id)

  async function handleDelete() {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate()
    }
  }

  const isPending = deleteMutation.isPending

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={isPending} onClick={() => onOpen(id)}>
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
