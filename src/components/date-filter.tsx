'use client'

import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useGetSummary } from '@/features/summary/api/use-get-summary'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format, subDays } from 'date-fns'
import { formatDateRange } from '@/lib/utils'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { ChevronDown } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

export function DateFilter() {
  const router = useRouter()
  const pathname = usePathname()

  const params = useSearchParams()
  const accountId = params.get('accountId')
  const from = params.get('from') || ''
  const to = params.get('to') || ''

  const { isLoading: isLoadingSummary } = useGetSummary()

  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  }

  const [date, setDate] = useState<DateRange | undefined>(paramState)

  function pushToURL(dateRange: DateRange | undefined) {
    const query = {
      from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd'),
      to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd'),
      accountId,
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    )

    router.push(url)
  }

  function onReset() {
    setDate(undefined)
    pushToURL(undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoadingSummary}
          size="sm"
          variant="outline"
          className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 lg:w-auto" align="start">
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="flex w-full items-center gap-2 p-4">
          <PopoverClose asChild>
            <Button
              onClick={onReset}
              disabled={!date?.from || !date?.to}
              className="w-full"
              variant="outline"
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => pushToURL(date)}
              disabled={!date?.from || !date?.to}
              className="w-full"
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
