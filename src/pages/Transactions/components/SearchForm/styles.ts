import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  margin-bottom: 1.5rem;

  input {
    flex: 1;

    background-color: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};

    max-height: 54px;
    padding: 1rem;

    border: 0;
    border-radius: 6px;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    background-color: transparent;
    color: ${(props) => props.theme['green-300']};

    border: 0;
    border: 1px solid ${(props) => props.theme['green-300']};
    border-radius: 6px;

    max-height: 54px;
    padding: 0.875rem 2rem;

    font-weight: bold;

    cursor: pointer;

    transition:
      background-color 0.15s,
      color 0.15s,
      border-color 0.15s;

    &::after {
      content: 'Buscar';
    }

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['green-500']};
      border-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    @media (max-width: 425px) {
      & {
        padding: 1rem;
      }

      &::after {
        content: '';
        display: none;
      }
    }
  }

  @media (max-width: 425px) {
    & {
      gap: 0.5rem;
    }
  }
`
