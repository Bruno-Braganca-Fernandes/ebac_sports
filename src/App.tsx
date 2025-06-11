import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { RootState } from './store'
import { useGetProdutosQuery } from './store/api'
import { toggleFavorito } from './store/reducers/favoritos'

function App() {
  const dispatch = useDispatch()

  const favoritos = useSelector((state: RootState) => state.favoritos)
  const carrinho = useSelector((state: RootState) => state.cart.items)

  const { data: produtos, isLoading } = useGetProdutosQuery()

  function favoritar(produto: any) {
    dispatch(toggleFavorito(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        {!isLoading && produtos && (
          <Produtos
            produtos={produtos}
            favoritos={favoritos}
            favoritar={favoritar}
          />
        )}
      </div>
    </>
  )
}

export default App
