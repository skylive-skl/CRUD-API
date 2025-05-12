import { User } from '../models/user';
import { users } from '../db/users';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsersService = (): User[] => users;

export const getUserService = (id: string): User | undefined => {
  return users.find((u) => u.id === id);
};

export const createUserService = (
  username: string,
  age: number,
  hobbies: string[],
): User => {
  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };
  users.push(newUser);
  return newUser;
};

export const updateUserService = (
  id: string,
  username: string,
  age: number,
  hobbies: string[],
): User | undefined => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return undefined;

  const updatedUser: User = {
    ...users[userIndex],
    id,
    username,
    age,
    hobbies,
  };
  users.splice(userIndex, 1, updatedUser);
  return updatedUser;
};

export const deleteUserService = (id: string): User | undefined => {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return undefined;

  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  return deletedUser;
};
