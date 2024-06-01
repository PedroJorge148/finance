import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'
import { convertAmountFromCents } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

export function useGetSummary() {
  const params = useSearchParams()

  const from = params.get('from') || ''
  const to = params.get('to') || ''
  const accountId = params.get('accountId') || ''

  const query = useQuery({
    queryKey: ['summary', { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch summary.')
      }

      const { data } = await response.json()
      return {
        ...data,
        incomeAmount: convertAmountFromCents(data.incomeAmount),
        expensesAmount: convertAmountFromCents(data.expensesAmount),
        remainingAmount: convertAmountFromCents(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromCents(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromCents(day.income),
          expenses: convertAmountFromCents(day.expenses),
        })),
      }
    },
  })

  return query
}
