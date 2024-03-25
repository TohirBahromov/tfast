import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { useAppSelector } from './store/store'
import Main from './components/Main/Main'
import Preloader from './components/customs/Preloader'

function App() {
  // States
  const [loading,setLoading] = useState<boolean>(true)
  const [remainingTime,setRemainingTime] = useState<number>(0)

  // Redux store
  const darkmode = useAppSelector(state => state.darkmode.darkmode)

  // Lifecycle
  const getRemainingTime = (number?:number) => { 
    if(number){
      setRemainingTime(number)
      console.log(remainingTime);
    }
  }
  useEffect(() => {
    handleLoading()
    getRemainingTime()
  },[remainingTime])

  // Functions
  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },3000)
  }

  return (
    <>
      {loading ? 
        <Preloader /> 
        : 
        <div className={`layout ${darkmode ? "dark" : ""}`}>
          <div className="container">
            <Navbar />
            <Main />
            <Footer />
          </div>
        </div>
      }
    </>
  )
}

export default App
