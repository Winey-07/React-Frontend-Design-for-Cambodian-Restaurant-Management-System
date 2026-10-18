import React from "react";
import DefualtImage from "../assets/uploadImage.png";

const ImageUpload = () => {
  const { avatarURL, setAvatarURL } = useState();
  return  (
    <div className="relative h-96 w-96">
    <img
    src={avatarURL}
    alt = "Avatar"
    className = "h-96 w-96"
    />   
  </div>
  )
  
}

export default ImageUpload;
