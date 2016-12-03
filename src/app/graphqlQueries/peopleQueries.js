import gql from 'graphql-tag';


export const AllPeopleForDisplay = gql`
  query AllPeopleForDisplay{
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

export const PersonForDisplay = gql`
  query PersonForDisplay($id: Int!){
    person(id: $id) {
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

export const EditPersonMutation = gql`
  mutation EditPersonMutation($id: Int!, $name: String!, $coffeeCost: Float!) {
    editPerson(
      id: $id,
      name: $name,
      coffee_price: $coffeeCost
    )
    {
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

export const AddPersonMutation = gql`
  mutation AddPersonMutation($name: String!, $coffeeCost: Float!) {
      createPerson(
        name: $name,
        coffee_price: $coffeeCost
      ){
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