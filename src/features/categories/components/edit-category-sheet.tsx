import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import { CategoryForm } from './category-form'
import { useOpenCategory } from '../hooks/use-open-category'
import { useGetCategory } from '../api/use-get-category'
import { Loader2 } from 'lucide-react'
import { useEditCategory } from '../api/use-edit-category'
import { useDeleteCategory } from '../api/use-delete-category'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertCategorySchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export function EditCategorySheet() {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this category.',
  )

  const { isOpen, onClose, id } = useOpenCategory()

  const categoryQuery = useGetCategory(id)
  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: '',
      }

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  async function onDelete() {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => onClose(),
      })
    }
  }

  const isPending = editMutation.isPending || deleteMutation.isPending

  const isLoading = categoryQuery.isLoading

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
