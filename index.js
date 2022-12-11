import { Component } from 'react'
import { createRoot } from 'react-dom/client'

import { Main } from './src/main'
import { Header } from './src/header'
import './styles.css'

const root = createRoot(document.getElementById('app'))

class App extends Component {

  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    )
  }
}

root.render(<App />)
