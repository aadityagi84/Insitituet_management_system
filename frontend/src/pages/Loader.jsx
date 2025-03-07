import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loader from "../assets/loading.lottie";

const Loader = () => {
  return (
    <div>
      <DotLottieReact src={loader} loop autoplay />
    </div>
  );
};

export default Loader;
