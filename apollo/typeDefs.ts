import gql from "graphql-tag";

export const typeDefs = gql`
  type Waste {
    id: ID!
    latitude: Float!
    longitude: Float!
  }

  input WasteInput {
    latitude: Float
    longitude: Float
  }

  input CreateWasteInput {
    waste: WasteInput!
  }

  type CreateWastePayload {
    waste: Waste
  }

  type Query {
    wastes: [Waste!]!
  }

  type Mutation {
    createWaste(input: CreateWasteInput!): CreateWastePayload
  }
`;
