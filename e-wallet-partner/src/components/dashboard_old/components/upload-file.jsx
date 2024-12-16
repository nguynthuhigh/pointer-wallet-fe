import React from "react";
import { useDropzone } from "react-dropzone";

const UploadFile = ({ image, setImage }) => {
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <>
            <p className='font-medium text-lg mb-[10px]'>Choose image voucher</p>
            <div {...getRootProps()} className="border border-gray-300 rounded-[6px] w-[200px] h-[200px] ">
                <input {...getInputProps()} required />
                {!image ? (
                    <p className="text-gray-500 font-medium text-md cursor-pointer flex justify-center items-center h-full">200x200</p>
                ) : (
                    <img
                        src={image}
                        alt="Avatar"
                        className="w-[200px] h-[200px] object-cover rounded-[6px]"
                    />
                )}
            </div>
        </>

    );
};

export default UploadFile;
