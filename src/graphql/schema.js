const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const queries = require('./queries');
const mutations = require('./mutations');

const schema = new GraphQLSchema({
  // list all GraphQL queries here
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => (queries),
  }),

  // list all GraphQL mutations here
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => (mutations),
  }),
});

module.exports = schema;