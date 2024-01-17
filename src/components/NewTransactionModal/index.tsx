import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionTypeGroup, TransactionTypeItem } from './styles'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form>
          <input type="text" id="description" name="description" placeholder="Descrição" required />
          <input type="number" id="price" name="price" placeholder="Preço" required />
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Categoria"
            list="categories"
            required
          />
          <datalist id="categories">
            <option value="Salário"></option>
            <option value="Aluguel"></option>
            <option value="Alimentação"></option>
          </datalist>

          <TransactionTypeGroup aria-label="Tipo de transação">
            <TransactionTypeItem value="income" $variant="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeItem>
            <TransactionTypeItem value="outcome" $variant="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeItem>
          </TransactionTypeGroup>

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
