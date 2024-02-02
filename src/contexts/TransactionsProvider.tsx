import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../plugins/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransaction {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

type FetchTransactionsType = {
  query?: string | null
}

type TransactionsContextType = {
  transactions: Transaction[]
  fetchTransactions: (params?: FetchTransactionsType) => Promise<void>
  createTransaction: (data: CreateTransaction) => Promise<void>
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
    const { query } = {
      query: null,
      ...params,
    }

    const request = await api.get<Transaction[]>('transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    const response = await request.data

    setTransactions(() => response)
  }

  async function createTransaction(data: CreateTransaction) {
    const { description, price, category, type } = data

    const response = await api.post<Transaction>('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
