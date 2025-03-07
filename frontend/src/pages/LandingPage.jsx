import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loader from "../assets/landing-page.lottie";

const LandingPage = () => {
  return (
    <div className="flex  items-center justify-center  h-full">
      <div className="w-[40%]">
        <DotLottieReact src={loader} loop autoplay />
      </div>
    </div>
  );
};

export default LandingPage;
