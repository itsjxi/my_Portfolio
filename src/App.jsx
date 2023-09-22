import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/header'
import Introcuction from './components/Intriduction/introduction'
import Skills from './components/skills/skills'
import Projects from './components/Projects/project'
import Contact from './components/contact/contact'
import Footer from './components/footer/footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/> 
    <Introcuction/>
    <Skills/>
    <Projects/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default App
