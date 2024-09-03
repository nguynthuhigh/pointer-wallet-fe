import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
const ScanQR: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndDecode();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const captureAndDecode = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        setQrCodeData(code.data);
        window.location.href = code.data;
      }
    };
  };
  return (
    <div class={`relative`}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{ facingMode: "environment" }}
      ></Webcam>
      <div class={`absolute w-full top-0`}>
        <div
          class={`mx-auto w-fit font-semibold text-xl text-white rounded-lg border-white mt-20 border-[2px] p-4`}
        >
          Quét mã QR để thanh toán hoặc chuyển tiền
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
