import React from "react"

export type ImageProps = {
  src:string,
}
export type ModalProps = {
  children:React.ReactNode,
  width?:string,
  height?:string,
  callback:() => void,
  classname?:string
}