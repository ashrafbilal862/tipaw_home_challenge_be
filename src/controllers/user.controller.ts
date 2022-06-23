import { ApiResponse } from "../utils";
import { userService } from "../services";

const createUser = async (_parent, args, _context, _info) => {
  console.log("createUser, success", args);
};

const getUser = async (_parent, args, _context, _info) => {
  try {
    const user = await userService.getUserById(args.userId);
    return user;
  } catch (err) {
    throw ApiResponse(err);
  }
};

const getUsers = async (_parent, args, _req, _gql) => {
  try {
    const users = await userService.queryUsers(args.filters);
    return users;
  } catch (err: any) {
    throw ApiResponse(err);
  }
};

const updateUser = async (_parent, args, _context, _info) => {
  try {
    const user = await userService.updateUserById(args.userId, args.updateBody);
    return user;
  } catch (err) {
    throw ApiResponse(err);
  }
};

const deleteUser = async (_parent, args, _context, _info) => {
  try {
    const user = await userService.deleteUserById(args.userId);
    return user;
  } catch (err) {
    throw ApiResponse(err);
  }
};

export default {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
