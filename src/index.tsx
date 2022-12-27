import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Header } from 'components/header'
import { Pages } from 'pages'
import './styles.css'

const root = createRoot(document.getElementById('app')!)

const App = () => (
  <>
    <Header />
    <Pages />
  </>
)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
