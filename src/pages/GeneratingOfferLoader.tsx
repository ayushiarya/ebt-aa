import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";

const GeneratingOfferLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/loan-offer", { replace: true }), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoadingScreen
      title="Generating Your Personalized Offer"
      subtitle="Please wait while we calculate the best balance transfer offer for you. Do not refresh or close this page."
    />
  );
};

export default GeneratingOfferLoader;
