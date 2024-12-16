import React, { useRef, useState } from 'react';
import DefaultAvatar from '../../assets/images/default_avatar.png'
const UploadImage = ({...props}) => {
    const inputFileRef = useRef(null);
    const [image, setImage] = useState(DefaultAvatar);
  
    const handleImageChange = (event) => {
      console.log(inputFileRef.current.files[0])
        const file = inputFileRef.current.files[0]
        if (file) {
            props.handleImageChange(file)
            setImage(URL.createObjectURL(file));
        }
    };
    
    const handleClick = () => {
      inputFileRef.current.click();
    };
  
  return (
    <div>
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <button type='button' className='relative ml-auto' onClick={handleClick}>
        <img
          alt=""
          className="object-cover cursor-pointer rounded-full size-[90px] border border-gray-300 "
          src={image}
        />
      </button>
    </div>
  )
}

export default UploadImage