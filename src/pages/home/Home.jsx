import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const { activeUser } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
    </div>
  );
};

export default Home;
