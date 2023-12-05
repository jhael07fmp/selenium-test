import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [newUser, setNewUser] = useState({});
  const { addUser, activeUser, addActiveUser } = useLocalStorage();

  const navigate = useNavigate();

  const defaultValues = {
    setter: setNewUser,
    initialState: newUser,
  };

  const inputs = [
    { ...defaultValues, label: "Full Name", propName: "name" },
    { ...defaultValues, label: "Username", propName: "username" },
    { ...defaultValues, label: "Password", type: "password", propName: "password" },
  ];

  const handleOnSubmit = () => {
    if (!newUser.name) {
      alert("Full name is required");
      return;
    }

    if (!newUser.username) {
      alert("Username is required");
      return;
    }

    if (!newUser.password) {
      alert("Password is required");
      return;
    }

    addUser(newUser);
    addActiveUser(newUser);
    alert("User successfully created");
    navigate("/home");
  };

  useEffect(() => {
    if (activeUser) navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  return { inputs, handleOnSubmit };
};
