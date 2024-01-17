import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1120px;

  margin: 0 auto;
  padding: 0 1.5rem;
`

export const NewTransactionButton = styled.button`
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};

  height: 50px;

  font-weight: bold;

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
`
