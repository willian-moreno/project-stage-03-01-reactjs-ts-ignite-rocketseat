import logoImg from '../../assets/ignite-logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <NewTransactionModal>
          <NewTransactionButton>Nova transação</NewTransactionButton>
        </NewTransactionModal>
      </HeaderContent>
    </HeaderContainer>
  )
}
