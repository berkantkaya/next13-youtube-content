import {RxAvatar} from 'react-icons/rx'
interface AvatarProps {
    image?: string
}
const Avatar:React.FC<AvatarProps> = ({image}) => {
   if(image) return <img src={image} alt="" />
   return <div><RxAvatar/></div>
}

export default Avatar