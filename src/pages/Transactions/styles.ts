import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1120px;

  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;

  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    background-color: ${(props) => props.theme['gray-700']};

    padding: 1.25rem 2rem;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant?: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
