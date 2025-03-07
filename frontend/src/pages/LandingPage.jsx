import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loader from "../assets/landing-page.lottie";
import { useAuth } from "../context/UserContext";

const LandingPage = ({ user }) => {
  const { roleData } = useAuth();
  // Define welcome messages and descriptions based on role
  const getWelcomeContent = () => {
    switch (roleData) {
      case 0:
        return {
          heading: "Welcome, Admin!",
          description:
            "Manage students, teachers, and all institute operations efficiently from your dashboard.",
        };
      case 1:
        return {
          heading: "Welcome, Teacher!",
          description:
            "Access student records, update course materials, and track progress with ease.",
        };
      case 2:
        return {
          heading: "Welcome, Student!",
          description:
            "Explore your courses, check assignments, and stay connected with your teachers.",
        };
      default:
        return {
          heading: "Welcome to Your Institute Management Dashboard!",
          description:
            "Access all features based on your role and streamline the institute experience.",
        };
    }
  };

  const { heading, description } = getWelcomeContent();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Typewriter Animated Heading */}
      <h1 className=" text-3xl font-bold mb-2 text-red-500">{heading}</h1>
      {/* Typewriter Animated Description */}
      <p className="cursor typewriter-animation text-lg text-gray-600 mb-6">
        {description}
      </p>
      <div className="w-[40%]">
        <DotLottieReact src={loader} loop autoplay />
      </div>
    </div>
  );
};

export default LandingPage;
