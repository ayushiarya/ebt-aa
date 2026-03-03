import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";

const BureauLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/add-loan", { replace: true }), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoadingScreen
      title="Fetching your loan details securely from the credit bureau"
      subtitle="Please do not refresh, go back or close this page."
    />
  );
};

export default BureauLoader;
