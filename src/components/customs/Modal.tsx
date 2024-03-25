import Icon from "./Icon"
import { ModalProps } from "../../types"

const Modal = ({children,width,height,callback,classname} : ModalProps) => {
  return (
    <div className="modal-outer">
      <div className={`modal ${classname}`} style={{width,height}}>
        <div className="inner">
          <div className="exit-modal" onClick={callback}>
            <Icon
              icon="fa-solid fa-xmark"
              size="icon-2xl"
            />
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal