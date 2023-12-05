import { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useLogin = () => {
  const [credentials, setCredentials] = useState({});
  const { users, addActiveUser } = useLocalStorage();
  const navigate = useNavigate();

  const inputs = [
    {
      label: "Username",
      initialState: credentials,
      propName: "username",
      setter: setCredentials,
      id: "username",
    },
    {
      label: "Password",
      initialState: credentials,
      propName: "password",
      setter: setCredentials,
      type: "password",
      id: "password",
    },
  ];

  const handleSubmit = () => {
    if (!credentials.username) {
      Swal.fire("Error", "Username is required", "error");
      return;
    }

    if (!credentials.password) {
      Swal.fire("Error", "Password is required", "error");
      return;
    }

    const isValidUser = (user) =>
      user.username.toLowerCase() === credentials.username.toLowerCase() &&
      user.password === credentials.password;

    const userExist = users?.find(isValidUser);

    if (!userExist) {
      Swal.fire("Error", "Username or password invalid", "error");
      return;
    }

    addActiveUser(credentials);
    navigate("/home");
  };

  return { inputs, handleSubmit };
};
