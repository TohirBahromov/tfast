import { ChangeEvent, useEffect, useRef, useState } from "react"
import "./Main.css"
import contents from "../../constants/texts"
import { useAppDispatch,useAppSelector } from "../../store/store"
import { notRunning, running } from "../../store/features/timerSlice"
import { handleRemainingTime } from "../../store/features/remainingTimeSlice"
import { notOver } from "../../store/features/gameoverSlice"
import Modal from "../customs/Modal"
import Loader from "../customs/Loader"

const Main = () => {
  // States
  const [text,setText] = useState<string>("")
  const [currentTxt,setCurrentTxt] = useState<string>("")
  const [focused, setFocused] = useState<boolean>(false)
  const [modal,setModal] = useState<string>("init")
  const [wrong,setWrong] = useState<number | undefined>(undefined)
  const [pending,setPending] = useState<number | undefined>(0)
  const [mistakes,setMistakes] = useState<number[]>([])
  const [loading,setLoading] = useState<boolean>(false)

  // Written characters
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const myCharacters = text.split("")
  const allCharacters = currentTxt.split("") 
  
  // Redux store
  const gameTime = useAppSelector(state => state.remaininingTime.remainingTime)
  const gameOver = useAppSelector(state => state.gameover.gameover)
  const dispatch = useAppDispatch()
  
  // Game init
  useEffect(() => {
    if(gameOver){
      gameInit()
      dispatch(notOver())
    }
  },[gameOver])
  
  // Functions
  const handleText = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    const textLength = inputValue.length
    const lastIndex = textLength - 1
    const expected = currentTxt.charAt(textLength - 1)
    setPending(lastIndex + 1) 
    if(inputValue[lastIndex] === expected){
      if(inputValue === currentTxt){  
        setModal("result")
        dispatch(notRunning())
      }else{
        setText(e.target.value)
        setWrong(undefined)
      }
    }else{
      setText(text)
      setWrong(lastIndex)
      setPending(lastIndex)
      setMistakes(prev => [...prev,1])
    }
  }
  const gameInit = () => {
    const random = Math.round(Math.random() * contents.length);
    const currentText = contents.find(item => item.id === random)?.text || "Bozor -  sotuvchilar bilan xaridorlar o'rtasidagi tovar ayirboshlash munosabatlari, ishlab chiqarish bilan iste'molni o'zaro bog'lovchi mexanizm. Bozor sub'yekti firmalar, uy xo'jaliklari, davlatning tashkilot, idoralari va boshqalardan iborat.";
    setCurrentTxt(currentText);
    setText("")
    setWrong(undefined)
    setPending(0)
    setFocused(false)
    setMistakes([])
    dispatch(notRunning())
    dispatch(handleRemainingTime(gameTime))
  }
  const mouseEnter = () => {
    if(textareaRef.current) {
      textareaRef.current.focus();
      setFocused(true)
      dispatch(running())
    }
  }
  const mouseLeave = () => {
    if(textareaRef.current){
      textareaRef.current.blur();
      setFocused(false)
    }
  }
  const mouseClick = () => {
    if(textareaRef.current) {
      textareaRef.current.focus();
      setFocused(true)
      dispatch(running())
    }
  }
  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },2000)
  }
  const leaveModal = () => {
    setModal("")
    gameInit()
    handleLoading()
  }

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <div className="main">
          <h1>{focused ? "Omad 😁" : "Effekt ustiga focus qilib, yozishni boshlang"}</h1>
          <div 
            className={`content ${focused ? "" : "not-focused"}`} 
            onMouseEnter={mouseEnter} 
            onMouseLeave={mouseLeave}
            onClick={mouseClick}
          >
            <div className="ongoing-text">
              <div className="wrapper">
                {allCharacters.map((item,index) => {
                  return (
                    <span 
                      key={index} 
                      className=
                      {`${myCharacters[index] == item ? "match" : "nomatch"} ${wrong == index ? "wrong" : ""} ${pending == index ? "pending" : ""}`}>
                        {item}
                    </span>
                  )
                })}
              </div>
            </div>
            <textarea 
              name="typer" 
              id="typer" 
              value={text} 
              ref={textareaRef} 
              onChange={handleText} 
              cols={30} 
              rows={30}>
            </textarea> 
          </div>
          <div className="refresh">
            <button onClick={gameInit}>Refresh</button>
          </div>

          {/* Initial Modal */}
          {modal == "init" && loading == false && (
            <Modal callback={leaveModal} classname="init">
              <div className="warning-modal">Ogohlantirish !</div>
              <p className="warning-txt">Matnlarni avvaldan o'qib olish kabi g'irromliklarni bartaraf etish maqsadida, blur ustiga sichqonchani olib kelishingiz bilan vaqt ketishni boshlaydi.Sichqonchani blurdan olsangiz ham vaqt ketishda davom etadi !</p>
              <div className="btn">
                <button className="warning-btn" onClick={leaveModal}>Tushunarli</button>
              </div>
            </Modal>
          )}
          {modal == "result" && (
            <Modal callback={leaveModal} classname="result">
              <div className="result-modal">Tabriklaymiz</div>
              <p className="warning-txt mb-0">Muvaffaqiyatli yakunladingiz</p>
              <p className="warning-txt">Xatolar : {mistakes.length}</p>
              <div className="btn">
                <button className="warning-btn" onClick={leaveModal}>Chiqish</button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}

export default Main