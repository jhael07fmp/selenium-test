const isValidUser = (user, credentials) =>
  user.username === credentials.username && user.password === credentials.password;

const userExist = users?.find(isValidUser);
