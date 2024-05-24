import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'

type Props = {
  id: string
  category: string | null
  categoryId: string | null
}

export const CategoryColumn = ({ id, categoryId, category }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory()
  const { onOpen: onOpenTransaction } = useOpenTransaction()

  function onClick() {
    if (categoryId) {
      onOpenCategory(categoryId)
    } else {
      onOpenTransaction(id)
    }
  }

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center hover:underline',
        !category && 'text-rose-500',
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || 'Uncategorized'}
    </div>
  )
}
