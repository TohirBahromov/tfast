import  "./customs.css"

const Icon = ({icon,size,classname}:{icon:string,size?:string,classname?:string}) => {
  return (
    <i className={`${icon} ${size} ${classname}`} aria-hidden={false}></i>
  )
}

export default Icon