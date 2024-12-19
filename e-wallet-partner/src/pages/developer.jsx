import { useEffect } from "react";

export default function Developer() {
  useEffect(() => {
    window.location.replace(
      "https://nguynthuhigh.github.io/pointer-payment-service/docs/category/api"
    );
  }, []);
  return <></>;
}
