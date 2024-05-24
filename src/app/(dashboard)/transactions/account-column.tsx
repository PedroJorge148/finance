import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

type Props = {
  account: string
  accountId: string
}

export const AccountColumn = ({ accountId, account }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount()

  function onClick() {
    onOpenAccount(accountId)
  }

  return (
    <div
      className="flex cursor-pointer items-center hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  )
}
