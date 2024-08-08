import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog'
import { useGetAccounts } from '../api/use-get-accounts'
import { useCreateAccount } from '../api/use-create-account'
import { Select } from '@/components/select'
import { on } from 'events'

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const [promise, setPromisse] = useState<{
    resolve: (value: string | undefined) => void
  } | null>(null)

  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  const onCreateAccount = (name: string) => accountMutation.mutate({ name })

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    value: account.id,
    label: account.name,
  }))

  const selectValue = useRef<string>()

  const confirm = () =>
    new Promise<unknown>((resolve, reject) => {
      setPromisse({ resolve })
    })

  const handleClose = () => {
    setPromisse(null)
  }

  const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose()
  }

  const handelCancel = () => {
    promise?.resolve(undefined)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder='Select an account'
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => {
            selectValue.current = value
          }}
          disabled={accountQuery.isLoading || accountQuery.isPending}
        />
        <DialogFooter className='pt-2'>
          <Button onClick={handelCancel} variant='outline'>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmationDialog, confirm]
}
