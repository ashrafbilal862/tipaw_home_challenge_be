import { GraphQLString, GraphQLFieldConfig, GraphQLList } from "graphql";
import { UserType } from "../types/";
import { userController } from "../../controllers";

type IField = Record<string, GraphQLFieldConfig<any, any>>;

const userQueries: IField = {
  queryUsers: {
    type: GraphQLList(UserType.UserType),
    args: {
      filters: { type: UserType.QueryUsersFilterType },
    },
    resolve: (...rest) => userController.getUsers(...rest),
  },
  getUser: {
    type: UserType.UserType,
    args: { userId: { type: GraphQLString } },
    resolve: (...rest) => userController.getUser(...rest),
  },
};

export default userQueries;
