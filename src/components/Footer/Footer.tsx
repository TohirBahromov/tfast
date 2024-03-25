// import Icon from "../customs/Icon"
import Icon from "../customs/Icon"
import "./Footer.css"
import links from "./links"

const Footer = () => {

  return (
    <footer>
      <div className="links">
        <ul>
          {links.map(l => {
            return <a href={`${l.link}`} key={l.id} target="_blank">
              <Icon 
                icon={l.icon}
                size="icon-xl"
                classname="mt-8 mb-8"
              />
            </a>
          })}
        </ul>
      </div>
      <span>Tohir Bahromov Portfolio / @2024.LLC</span>
    </footer>
  )
}

export default Footer