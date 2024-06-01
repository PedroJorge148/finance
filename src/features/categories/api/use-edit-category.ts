import { toast } from 'sonner'
import { InferRequestType, InferResponseType } from 'hono'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.categories)[':id']['$patch']
>['json']

export function useEditCategory(id?: string) {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[':id'].$patch({
        param: { id },
        json,
      })

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Category edited!')
      queryClient.invalidateQueries({ queryKey: ['category', { id }] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: (e) => {
      console.error(e)
      toast.error('Failed on edit category.')
    },
  })

  return mutation
}
