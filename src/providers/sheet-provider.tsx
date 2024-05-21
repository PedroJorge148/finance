'use client'

import { useMountedState } from 'react-use'

import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet'
import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet'

export function SheetProvider() {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  )
}