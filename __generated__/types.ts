/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddThingMutation
// ====================================================

export interface AddThingMutation_createThing_thing {
  __typename: "Thing";
  id: string;
  lat: number;
  lng: number;
}

export interface AddThingMutation_createThing {
  __typename: "CreateThingPayload";
  thing: AddThingMutation_createThing_thing | null;
}

export interface AddThingMutation {
  createThing: AddThingMutation_createThing | null;
}

export interface AddThingMutationVariables {
  input: CreateThingInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ThingsListQuery
// ====================================================

export interface ThingsListQuery_things {
  __typename: "Thing";
  id: string;
  lat: number;
  lng: number;
}

export interface ThingsListQuery {
  things: ThingsListQuery_things[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateThingInput {
  thing: ThingInput;
}

export interface ThingInput {
  lat?: number | null;
  lng?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
