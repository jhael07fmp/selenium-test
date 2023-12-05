export const useLocalStorage = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const addUser = (user) => localStorage.setItem("users", JSON.stringify([...users, user]));

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const addActiveUser = (user) => {
    const findUser = users.find(
      (u) =>
        u.username.toLowerCase() === user.username.toLowerCase() && u.password === user.password
    );

    if (findUser) localStorage.setItem("activeUser", JSON.stringify(findUser));
  };

  return { users, addUser, addActiveUser, activeUser };
};
