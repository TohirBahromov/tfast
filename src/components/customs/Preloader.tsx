import keys from "../../constants/keyboard"

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="keyboard">
        {keys.map((item) => {
          return(
            <span key={item.id} className={`keyboard-key st${item.id}`}>{item.key}</span>
          )
        })}
        <div className="backside"></div>
      </div>
    </div>
  )
}

export default Preloader