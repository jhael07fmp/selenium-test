import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";

const Home = () => {
  const { activeUser } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  return <div>Home</div>;
};

export default Home;
