import { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
      Swal.fire("Error", "Full name is required", "error");
      return;
    }

    if (!newUser.username) {
      Swal.fire("Error", "Username is required", "error");
      return;
    }

    if (!newUser.password) {
      Swal.fire("Error", "Password is required", "error");
      return;
    }

    if (!passwordRegex.test(newUser.password)) {
      Swal.fire(
        "Error",
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character and be at least 8 characters long.",
        "error"
      );
      return;
    }

    addUser(newUser);
    localStorage.setItem("activeUser", JSON.stringify(newUser));

    Swal.fire("Success", "User successfully created", "success");

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return { inputs, handleOnSubmit };
};
