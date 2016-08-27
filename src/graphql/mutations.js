const { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');
const outingService = require('./outingService');
const personService = require('./personService');
const { personType, outingType } = require('./types');

module.exports = {
  createPerson: {
    type: personType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      number_coffee_drank: { type: GraphQLFloat },
      number_coffee_paid: { type: GraphQLFloat },
      coffee_price: { type: GraphQLFloat },
    },
    resolve: (_, args, context) => {
      return personService.createPerson(args, context.dbClient);
    },
  },
  editPerson: {
    type: personType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      number_coffee_drank: { type: GraphQLFloat },
      number_coffee_paid: { type: GraphQLFloat },
      coffee_price: { type: GraphQLFloat },
    },
    resolve: (_, args, context) => {
      return personService.editPerson(args, context.dbClient);
    },
  },
  createOuting: {
    type: outingType,
    args: {
      payer_id: { type: new GraphQLNonNull(GraphQLInt) },
      total_cost: { type: new GraphQLNonNull(GraphQLFloat) },
      people_ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
    },
    resolve: (_, args, context) => {
      return outingService.createOuting(args, context.dbClient);
    },
  },
};