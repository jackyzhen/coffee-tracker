import gql from 'graphql-tag';

export const AllOutingsAllPeopleQuery = gql`
  query AllOutingsQuery {
    allOutings: outings {
      id
      payer_id
      total_cost
      created_at
      personIds
    }
    allPeople: people {
      id
      name
      number_coffee_drank
      number_coffee_paid
      coffee_price
      created_at
      updated_at
      outingIds
    }
  }
`;

export const OutingQuery = gql`
  query OutingQuery($id: Int!){
    outing(id: $id) {
      id
      payer_id
      total_cost
      created_at
      personIds
    }
    allPeople: people {
      id
      name
      number_coffee_drank
      number_coffee_paid
      coffee_price
      created_at
      updated_at
      outingIds
    }
  },
`;

export const AddOutingMutation = gql`
  mutation AddOutingMutation($payerId: Int!, $totalCost: Float!, $peopleIds: [Int]!) {
    createOuting (
      payer_id: $payerId,
      total_cost: $totalCost,
      people_ids: $peopleIds
    ){
      id
      payer_id
      total_cost
      created_at
      personIds
      people {
        id
        name
        number_coffee_drank
        number_coffee_paid
        coffee_price
        created_at
        updated_at
      }
    }
  }
`;