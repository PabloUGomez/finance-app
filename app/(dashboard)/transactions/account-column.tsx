import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"

type Props = {
  accountId: string | null
  account: string | null
}

export const AccountColumn = ({accountId, account }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount()

  const onClick = () => {
    if (!accountId) return
    onOpenAccount(accountId)
  }

  return (
    <div
      className='flex items-center cursor-pointer hover:underline'
      onClick={onClick}
    >
      {account}
    </div>
  )
}
