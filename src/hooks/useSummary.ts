import { useMemo } from 'react'
import { TransactionsContext } from '../contexts/TransactionsProvider'
import { priceFormatter } from '../utils/formatter'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type === 'income') {
          accumulator.income += transaction.price
          accumulator.total += transaction.price
          return accumulator
        }

        accumulator.outcome += transaction.price
        accumulator.total -= transaction.price
        return accumulator
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return {
    ...summary,
    formattedIncome: priceFormatter.format(summary.income),
    formattedOutcome: priceFormatter.format(summary.outcome),
    formattedTotal: priceFormatter.format(summary.total),
  }
}
