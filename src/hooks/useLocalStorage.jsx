export const useLocalStorage = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const addUser = (user) => {
    if (Array.isArray(users)) localStorage.setItem("users", JSON.stringify([...users, user]));
    else localStorage.setItem("users", JSON.stringify([user]));
  };

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const addActiveUser = (user) => {
    if (!users) {
      alert("klk");
      localStorage.setItem("activeUser", JSON.stringify(user));
    }

    const findUser = users?.find(
      (u) =>
        u.username.toLowerCase() === user.username.toLowerCase() && u.password === user.password
    );

    if (findUser) localStorage.setItem("activeUser", JSON.stringify(findUser));
  };

  const removeActiveUser = () => localStorage.removeItem("activeUser");

  return { users, addUser, addActiveUser, activeUser, removeActiveUser };
};
