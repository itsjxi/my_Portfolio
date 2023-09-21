import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/header'
import Introcuction from './components/Intriduction/introduction'
import Skills from './components/skills/skills'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/> 
    <Introcuction/>
    <Skills/>
    </>
  )
}

export default App
