import React, { useRef, useState } from 'react';

interface UploadImageProps {
  handleImageChange: (file: File) => void,
  image:string
}

const UploadImage: React.FC<UploadImageProps> = (props) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | undefined>(props.image);
  const handleImageChange = () => {
    if (inputFileRef.current && inputFileRef.current.files) {
      const file = inputFileRef.current.files[0];
      if (file) {
        props.handleImageChange(file);
        setImage(URL.createObjectURL(file));
      }
    }
  };

  const handleClick = () => {
    inputFileRef.current?.click();
  };
  return (
    <div className=''>
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <button type='button' className='relative' onClick={handleClick}>
        <img
          alt=""
          className="object-cover cursor-pointer rounded-full h-36 w-36"
          src={image}
        />
      </button>
    </div>
  );
};

export default UploadImage;
