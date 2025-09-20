const { GraphQLSchema } = require('graphql');
const { QueryType, MutationType } = require('./types');

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

module.exports = schema;

