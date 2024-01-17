import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;
  padding: 1.5rem;

  background-color: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${(props) => props.theme['gray-800']};

  min-width: 32rem;
  padding: 2.5rem 3rem;

  border-radius: 6px;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin-top: 2rem;

    input {
      background-color: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};

      padding: 1rem;

      border: 0;
      border-radius: 6px;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }

      &::-webkit-calendar-picker-indicator {
        display: none !important;
      }
    }

    button[type='submit'] {
      background-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};

      height: 50px;

      font-weight: bold;

      margin-top: 1.5rem;
      padding: 0 1.25rem;

      border-radius: 6px;
      border: 0;

      cursor: pointer;

      transition:
        background-color 0.15s,
        color 0.15s;

      &:hover {
        background-color: ${(props) => props.theme['green-700']};
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  background-color: transparent;
  color: ${(props) => props.theme['gray-400']};

  border: 0;

  line-height: 0;

  cursor: pointer;
`

export const TransactionTypeGroup = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 1rem;
`

interface TransactionTypeItemProps {
  $variant: 'income' | 'outcome'
}

export const TransactionTypeItem = styled(RadioGroup.Item)<TransactionTypeItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  background-color: ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme['gray-300']};

  border: 0;
  border-radius: 6px;

  padding: 1rem 1.5rem;

  font-weight: bold;

  cursor: pointer;

  transition:
    background-color 0.15s,
    color 0.15s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    color: ${(props) =>
      props.$variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background-color: ${(props) =>
      props.$variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }

  &[data-state='unchecked']:hover {
    background-color: ${(props) => props.theme['gray-600']};
  }
`
