import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    isEmailVerified: { type: GraphQLBoolean },
  }),
});

const QueryUsersFilterType = new GraphQLInputObjectType({
  name: "QueryUsersFilter",
  fields: () => ({
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  }),
});

const UserUpdateBodyInput = new GraphQLInputObjectType({
  name: "UserUpdateBody",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

export default { UserType, UserUpdateBodyInput, QueryUsersFilterType };
