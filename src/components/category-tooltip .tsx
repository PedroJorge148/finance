import { formatCurrency } from '@/lib/utils'
import { Separator } from './ui/separator'

export function CategoryTooltip({ active, payload }: any) {
  if (!active) return null

  const name = payload[0].payload.name
  const value = payload[0].value

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted p-2 px-3 text-sm text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="space-y-1 p-2 px-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  )
}
