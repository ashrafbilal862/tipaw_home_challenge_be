// @ts-nocheck
import httpStatus from "http-status";
import { authService, userService, tokenService } from "../services";

const register = async (_parent, args, _context, _info) => {
  const user = await userService.createUser(args);
  const tokens = await tokenService.generateAuthTokens(user);
  return { user, tokens };
};

const login = async (_parent, args, _context, _info) => {
  const { email, password } = args;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  return { user, tokens };
};

const logout = async (_parent, args, _context, _info) => {
  await authService.logout(args.refreshToken);
  return {
    status: httpStatus.OK,
    message: "Logged out",
  };
};

const refreshToken = async (_parent, args, _context, _info) => {
  const { user, tokens } = await authService.refreshAuth(args.refreshToken);
  return { user, tokens };
};

export default {
  register,
  login,
  logout,
  refreshToken,
};
