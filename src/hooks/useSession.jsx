import { useLocalStorage } from "./useLocalStorage";

export const useSession = (credentials) => {
  const { users } = useLocalStorage();

  const isValidUser = (user, credentials) =>
    user.username === credentials.username && user.password === credentials.password;

  const userExist = users?.find((user) => isValidUser(user, credentials));

  return { userExist };
};
