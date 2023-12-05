import { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [newUser, setNewUser] = useState({});

  const { addUser } = useLocalStorage();
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.]).{8,}$/;

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

    if (!passwordRegex.test(newUser.password)) {
      alert(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
      );
      return;
    }

    addUser(newUser);
    localStorage.setItem("activeUser", JSON.stringify(newUser));
    alert("User successfully created");
    navigate("/home");
  };

  return { inputs, handleOnSubmit };
};
