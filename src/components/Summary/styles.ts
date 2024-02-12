import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  width: 100%;
  max-width: 1120px;

  margin: -5rem auto 0;
  padding: 0 1.5rem;

  overflow-x: auto;
`
interface SummaryCardProps {
  $variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${(props) => props.theme['gray-600']};

  min-width: 17.5rem;
  padding: 2rem;

  border-radius: 6px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;

    margin-top: 1rem;

    font-size: 2rem;
  }

  ${(props) =>
    props.$variant === 'green' &&
    css`
      background-color: ${props.theme['green-700']};
    `}
`
