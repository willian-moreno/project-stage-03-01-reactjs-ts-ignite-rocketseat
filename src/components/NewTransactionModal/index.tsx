import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { ReactNode, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsProvider'
import { CloseButton, Content, Overlay, TransactionTypeGroup, TransactionTypeItem } from './styles'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

interface NewTransactionModalProps {
  children: ReactNode
}

export function NewTransactionModal({ children }: NewTransactionModalProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data

    await createTransaction({
      description,
      price,
      category,
      type,
    })

    setDialogOpen(false)
    reset()
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input type="text" placeholder="Descrição" {...register('description')} required />
            <input
              type="number"
              placeholder="Preço"
              step={0.01}
              {...register('price', { valueAsNumber: true })}
              required
            />
            <input
              type="text"
              placeholder="Categoria"
              list="categories"
              {...register('category')}
              required
            />
            <datalist id="categories">
              <option value="Salário"></option>
              <option value="Aluguel"></option>
              <option value="Alimentação"></option>
            </datalist>

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionTypeGroup
                    aria-label="Tipo de transação"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <TransactionTypeItem value="income" $variant="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeItem>
                    <TransactionTypeItem value="outcome" $variant="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionTypeItem>
                  </TransactionTypeGroup>
                )
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
