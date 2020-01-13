import gql from "graphql-tag";

export const typeDefs = gql`
  type Thing {
    id: ID!
    latitude: Float!
    longitude: Float!
  }

  input ThingInput {
    latitude: Float
    longitude: Float
  }

  input CreateThingInput {
    thing: ThingInput!
  }

  type CreateThingPayload {
    thing: Thing
  }

  type Query {
    things: [Thing!]!
  }

  type Mutation {
    createThing(input: CreateThingInput!): CreateThingPayload
  }
`;
