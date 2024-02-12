import { CalendarBlank, TagSimple } from 'phosphor-react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsProvider'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableContainer,
  TransactionsCounter,
  TransactionsCardContainer,
  TransactionsCard,
} from './styles'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsCounter>
          Transações{' '}
          <span>
            {transactions.length} {transactions.length > 1 ? 'itens' : 'item'}
          </span>
        </TransactionsCounter>

        <SearchForm />

        <TransactionsTableContainer>
          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighlight $variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionsTable>
        </TransactionsTableContainer>
        <TransactionsCardContainer>
          {transactions.map((transaction) => {
            return (
              <TransactionsCard key={transaction.id}>
                <p>{transaction.description}</p>
                <PriceHighlight $variant={transaction.type}>
                  {transaction.type === 'outcome' && '- '}
                  {priceFormatter.format(transaction.price)}
                </PriceHighlight>
                <div>
                  <span>
                    <TagSimple /> {transaction.category}
                  </span>
                  <span>
                    <CalendarBlank /> {dateFormatter.format(new Date(transaction.createdAt))}
                  </span>
                </div>
              </TransactionsCard>
            )
          })}
        </TransactionsCardContainer>
      </TransactionsContainer>
    </>
  )
}
