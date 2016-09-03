const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList } = require('graphql');
const outingService = require('./outingService');
const personService = require('./personService');


const personType = new GraphQLObjectType({
  name: 'personType',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    number_coffee_drank: { type: GraphQLFloat },
    number_coffee_paid: { type: GraphQLFloat },
    coffee_price: { type: GraphQLFloat },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    outingIds: {
      type: new GraphQLList(GraphQLInt),
      resolve(person, _, context) {
        return outingService.getOutingsByPerson(person.id, context.dbClient);
      },
    },
  }),
});
const outingType = new GraphQLObjectType({
  name: 'outingType',
  fields: () => ({
    id: { type: GraphQLInt },
    payer_id: { type: GraphQLInt },
    total_cost: { type: GraphQLFloat },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    personIds: {
      type: new GraphQLList(GraphQLInt),
      resolve(outing, _, context) {
        return personService.getPeopleByOuting(outing.id, context.dbClient);
      },
    },
    people: {
      type: new GraphQLList(personType),
      resolve(outing, _, context) {
        return personService.getFullPeopleByOuting(outing.id, context.dbClient);
      },
    },
  }),
});
module.exports = {
  personType,
  outingType,
};