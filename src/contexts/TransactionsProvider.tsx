import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../plugins/axios'
import { createContext } from 'use-context-selector'

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

  const fetchTransactions = useCallback(async (params: FetchTransactionsType = {}) => {
    const { query } = {
      query: null,
      ...params,
    }

    try {
      const request = await api.get<Transaction[]>('transactions', {
        params: {
          q: query,
          _sort: 'createdAt',
          _order: 'desc',
        },
      })

      setTransactions(request.data)
    } catch (error) {
      console.log('Ocorreu um erro ao tentar buscar as transações.')
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const createTransaction = useCallback(async (data: CreateTransaction) => {
    const { description, price, category, type } = data

    try {
      const response = await api.post<Transaction>('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    } catch (error) {
      console.log('Ocorreu um erro ao tentar criar uma nova transação.')
    }
  }, [])

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
