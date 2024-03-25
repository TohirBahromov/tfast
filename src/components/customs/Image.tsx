import { ImageProps } from '../../types'

const Image = ({src} : ImageProps) => {
  return (
    <img 
      src={src} 
      alt={src} 
      className='image--container__img'
    />
  )
}

export default Image