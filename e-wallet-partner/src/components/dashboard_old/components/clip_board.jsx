import CopyToClipBoard from "react-copy-to-clipboard"
import { useState } from "react"
import { FaCircleCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import ShowHide from "./show_hide";
const CopyClipBoard = ({ text }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }
    return (
        <>
            <div className='flex items-center space-x-[5px] cursor-pointer'>
                <ShowHide text={text} />
                <CopyToClipBoard
                    text={text}
                    onCopy={handleCopy}
                >
                    {copied ? (
                        <FaCircleCheck className='text-green-500' />
                    ) : (
                        <IoCopyOutline />
                    )
                    }
                </CopyToClipBoard>
                {copied && <span className='text-green-500 ml-2'>Copied!</span>}
            </div>
        </>
    )
}
export default CopyClipBoard;