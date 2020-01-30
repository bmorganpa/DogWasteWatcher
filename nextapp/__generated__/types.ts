/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddWasteMutation
// ====================================================

export interface AddWasteMutation_createWaste_waste {
  __typename: "Waste";
  id: string;
  latitude: number;
  longitude: number;
}

export interface AddWasteMutation_createWaste {
  __typename: "CreateWastePayload";
  waste: AddWasteMutation_createWaste_waste | null;
}

export interface AddWasteMutation {
  createWaste: AddWasteMutation_createWaste | null;
}

export interface AddWasteMutationVariables {
  input: CreateWasteInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WastesListQuery
// ====================================================

export interface WastesListQuery_wastes {
  __typename: "Waste";
  id: string;
  latitude: number;
  longitude: number;
}

export interface WastesListQuery {
  wastes: WastesListQuery_wastes[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateWasteInput {
  waste: WasteInput;
}

export interface WasteInput {
  latitude?: number | null;
  longitude?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
