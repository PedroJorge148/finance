import { toast } from 'sonner'
import { InferRequestType, InferResponseType } from 'hono'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.accounts)[':id']['$patch']
>['json']

export function useEditAccount(id?: string) {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[':id'].$patch({
        param: { id },
        json,
      })

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Account edited!')
      queryClient.invalidateQueries({ queryKey: ['account', { id }] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      // TODO: Invalidate summary and transactions
    },
    onError: (e) => {
      console.error(e)
      toast.error('Failed on edit account.')
    },
  })

  return mutation
}
