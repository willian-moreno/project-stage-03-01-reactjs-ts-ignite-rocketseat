import { ReactNode, createContext, useEffect, useState } from 'react'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

type FetchTransactionsType = {
  query?: string | null
}

type TransactionsContextType = {
  transactions: Transaction[]
  fetchTransactions: (params?: FetchTransactionsType) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions(params: FetchTransactionsType = {}) {
    const url = new URL('http://localhost:3333/transactions')
    const { query } = {
      query: null,
      ...params,
    }

    if (query) {
      url.searchParams.append('q', query)
    }

    const request = await fetch(url)
    const response = (await request.json()) as Transaction[]

    setTransactions(() => response)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
