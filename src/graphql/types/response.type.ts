import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const ResponseType = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

export default { ResponseType };
