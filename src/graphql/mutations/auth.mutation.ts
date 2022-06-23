import { GraphQLBoolean, GraphQLFieldConfig, GraphQLString } from "graphql";
import { AuthType, ResponseType } from "../types";
import { authController } from "../../controllers";
type IField = Record<string, GraphQLFieldConfig<any, any>>;

const authMutations: IField = {
  createUser: {
    type: AuthType.RegisterType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      phoneNumber: { type: GraphQLString },
      password: { type: GraphQLString },
      acceptedTerms: { type: GraphQLBoolean },
    },
    resolve: (...rest) => authController.register(...rest),
  },
  logout: {
    type: ResponseType.ResponseType,
    args: {
      refreshToken: { type: GraphQLString },
    },
    resolve: (...rest) => authController.logout(...rest),
  },
  refreshToken: {
    type: AuthType.RefreshTokenType,
    args: {
      refreshToken: { type: GraphQLString },
    },
    resolve: (...rest) => authController.refreshToken(...rest),
  },
};

export default authMutations;
