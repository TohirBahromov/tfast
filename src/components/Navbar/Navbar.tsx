import "./Navbar.css"
import Icon from "../customs/Icon"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { toggleDarkMode } from "../../store/features/darkmodeSlice"
import { useEffect, useState } from "react"
import { formatTime } from "../../utils"
import { notRunning } from "../../store/features/timerSlice"
import { handleRemainingTime } from "../../store/features/remainingTimeSlice"
import { over } from "../../store/features/gameoverSlice"
import darkLogo from "../../assets/dark.png"
import lightLogo from "../../assets/light.png"
import Modal from "../customs/Modal"
import Loader from "../customs/Loader"

const Navbar = () => {
  
  // Redux store
  const darkmode = useAppSelector(state => state.darkmode.darkmode)
  const isRunning = useAppSelector(state => state.timer.isRunning)
  const gameTime = useAppSelector(state => state.remaininingTime.remainingTime)
  const dispatch = useAppDispatch()

  // States
  const [remainingTime,setRemainingTime] = useState<number>(gameTime)
  const [modal,setModal] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)

  // Functions
  const handleTimer = (active:number) => {
    dispatch(handleRemainingTime(active))
    dispatch(notRunning())
    dispatch(over())
  }
  const leaveModal = () => {
    dispatch(over())
    dispatch(notRunning())
    handleLoading()
    setModal("")
  }
  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },2000)
  }
  
  // LifeCycle
  useEffect(() => {
    setRemainingTime(gameTime)
    if (isRunning) {
      const id = setInterval(() => {
        setRemainingTime(prevRemainingTime => {
          if (prevRemainingTime <= 0) {
            clearInterval(id);
            dispatch(notRunning())
            setModal("gameover")
            return 0;
          }
          return prevRemainingTime - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isRunning, gameTime]);

  return (
    <>
      {loading && <Loader />}
      <nav className="navbar">
        <div className="top">
          <div className="logo">
            <img 
              src={`${darkmode ? darkLogo : lightLogo}`}
            />
          </div>
          <div className="mode" onClick={()=>dispatch(toggleDarkMode())}>
            <Icon
              icon={"fa-regular fa-sun"}
              size="icon-xl"
              classname={`${darkmode ? "active" : ""} sun`}
            />
            <Icon
              icon={"fa-regular fa-moon"}
              size="icon-xl"
              classname={`${darkmode ? "" : "active"} moon`}
            />
          </div>
        </div>
        <div className="bottom">
          <div className="set--timer_">
            <Icon icon="fa-solid fa-hourglass" size="icon-lg" classname="me-8" />
            <ul>
              <li className={`${gameTime == 15 && "active"}`} onClick={()=>handleTimer(15)}>15s</li>
              <li className={`${gameTime == 30 && "active"}`} onClick={()=>handleTimer(30)}>30s</li>
              <li className={`${gameTime == 60 && "active"}`} onClick={()=>handleTimer(60)}>60s</li>
            </ul>
          </div>
          <div className="timer">{formatTime(remainingTime)}</div>
        </div>
      </nav>

      {/* Modals */}
      {modal == "gameover" && (
        <Modal callback={leaveModal} classname="gameover">
          <div className="warning-modal">Vaqt tugadi 🥲</div>
          <p className="warning-txt">Qaytadan urinib ko'ring</p>
          <div className="btn">
            <button className="warning-btn" onClick={leaveModal}>Qayta boshlash</button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Navbar