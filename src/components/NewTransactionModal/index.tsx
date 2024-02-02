import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CloseButton, Content, Overlay, TransactionTypeGroup, TransactionTypeItem } from './styles'

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(data)
  }

  return (
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
  )
}
