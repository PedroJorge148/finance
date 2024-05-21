'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useBulkDeleteCategories } from '@/features/categories/api/use-balk-delete-categories'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'

import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'

export default function CategoriesPage() {
  const newCategory = useNewCategory()
  const deleteCategories = useBulkDeleteCategories()
  const categoriesQuery = useGetCategories()
  const categories = categoriesQuery.data || []

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending

  if (categoriesQuery.isLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Categories page
          </CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <Plus className="mr-2 size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={categories}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteCategories.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
