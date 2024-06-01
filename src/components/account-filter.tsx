'use client'

import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useGetSummary } from '@/features/summary/api/use-get-summary'

export function AccountFilter() {
  const router = useRouter()
  const pathname = usePathname()

  const params = useSearchParams()
  const accountId = params.get('accountId') || 'all'
  const from = params.get('from') || ''
  const to = params.get('to') || ''

  const { isLoading: isLoadingSummary } = useGetSummary()
  const { data, isLoading: isLoadingAccounts } = useGetAccounts()

  function onChange(newValue: string) {
    const query = {
      accountId: newValue,
      from,
      to,
    }

    if (newValue === 'all') {
      query.accountId = ''
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

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {data?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}