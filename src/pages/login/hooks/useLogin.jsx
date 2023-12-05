import { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

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
    },
    {
      label: "Password",
      initialState: credentials,
      propName: "password",
      setter: setCredentials,
      type: "password",
    },
  ];

  const handleSubmit = () => {
    if (!credentials.username) {
      alert("Username is required");
      return;
    }

    if (!credentials.password) {
      alert("Password is required");
      return;
    }

    const isValidUser = (user) =>
      user.username.toLowerCase() === credentials.username.toLowerCase() &&
      user.password === credentials.password;

    const userExist = users?.find(isValidUser);

    if (!userExist) {
      alert("Username or password invalid");
      return;
    }

    addActiveUser(credentials);
    navigate("/home");
  };

  return { inputs, handleSubmit };
};
