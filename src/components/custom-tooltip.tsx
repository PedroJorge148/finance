import { format } from 'date-fns'
import { Separator } from './ui/separator'
import { formatCurrency } from '@/lib/utils'
import { TooltipProps } from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

export function CustomTooltip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload) return null

  const date = payload[0].payload.date
  const income = Number(payload[0].value)
  const expenses = Number(payload[1].value)

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted p-2 px-3 text-sm text-muted-foreground">
        {format(date, 'MMM dd, yyyy')}
      </div>
      <Separator />
      <div className="space-y-1 p-2 px-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="size-1.5 rounded-full bg-blue-500" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  )
}
