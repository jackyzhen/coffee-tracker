const { GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql');
const outingService = require('./outingService');
const personService = require('./personService');
const { personType, outingType } = require('./types');

module.exports = {
  person: {
    type: personType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, args, context) => {
      return personService.getPerson(args.id, context.dbClient);
    },
  },
  people: {
    type: new GraphQLList(personType),
    resolve: (_, args, context) => {
      return personService.getPeople(context.dbClient);
    },
  },
  outing: {
    type: outingType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, args, context) => {
      return outingService.getOuting(args.id, context.dbClient);
    },
  },
  outings: {
    type: new GraphQLList(outingType),
    resolve: (_, args, context) => {
      return outingService.getOutings(context.dbClient);
    },
  },
};