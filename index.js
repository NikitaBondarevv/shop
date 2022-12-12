import { createRoot } from 'react-dom/client'

import { Main } from './src/main'
import { Header } from './src/header'
import './styles.css'

const root = createRoot(document.getElementById('app'))

const App = () => (
  <>
    <Header />
    <Main />
  </>
)

root.render(<App />)
