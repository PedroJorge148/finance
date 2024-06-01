import { DateFilter } from '@/components/date-filter'
import { AccountFilter } from '@/components/account-filter'

export function Filters() {
  return (
    <div className="flex flex-col items-center gap-2 lg:flex-row">
      <AccountFilter />
      <DateFilter />
    </div>
  )
}
