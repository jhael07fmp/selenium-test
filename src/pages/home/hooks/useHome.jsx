import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useEffect } from "react";

export const useHome = () => {
  const { activeUser } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  const time = new Date().getHours() > 12;
  const greet =
    activeUser.name[0].toUpperCase() + activeUser.name.substring(1, activeUser.name.length);
  return { time, greet };
};
