import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1120px;

  margin: 4rem auto;
  padding: 0 1.5rem;

  @media (max-width: 425px) {
    & {
      margin: 2.5rem auto;
    }
  }
`

export const TransactionsCounter = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1.5rem;

  font:
    400 1.125rem/160% 'Roboto',
    'Arial',
    sans-serif;

  span {
    font:
      400 1rem/160% 'Roboto',
      'Arial',
      sans-serif;
    color: ${(props) => props.theme['gray-500']};
  }

  @media (max-width: 425px) {
    & {
      display: flex;
    }
  }
`

export const TransactionsTableContainer = styled.div`
  display: flex;

  width: 100%;

  overflow: auto;

  @media (max-width: 425px) {
    & {
      display: none;
    }
  }
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

    @media (max-width: 425px) {
      & {
        white-space: nowrap;
      }
    }
  }
`

export const TransactionsCardContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.75rem;

  width: 100%;

  @media (max-width: 425px) {
    & {
      display: flex;
    }
  }
`

export const TransactionsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: ${(props) => props.theme['gray-600']};

  width: 100%;
  padding: 1.25rem;

  border-radius: 6px;

  & > span {
    display: block;

    font-size: 1.25rem;
    font-weight: bold;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.25rem;

      color: ${(props) => props.theme['gray-500']};
    }
  }
`

interface PriceHighlightProps {
  $variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.$variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
`
