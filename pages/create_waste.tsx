import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { withApollo } from "../apollo/client";
import { WASTES_QUERY } from "./index";
import { AddWasteMutation, WastesListQuery } from "../__generated__/types";
import { AddWasteMutationVariables } from "../__generated__/types";

const CREATE_WASTE_MUTATION = gql`
  mutation AddWasteMutation($input: CreateWasteInput!) {
    createWaste(input: $input) {
      waste {
        id
        latitude
        longitude
      }
    }
  }
`;

const Index = () => {
  const { t } = useTranslation("create_waste");
  const router = useRouter();
  const [addWaste] = useMutation<AddWasteMutation, AddWasteMutationVariables>(
    CREATE_WASTE_MUTATION,
    {
      update(cache, { data }) {
        const wastesQuery = cache.readQuery<WastesListQuery>({
          query: WASTES_QUERY,
        });
        if (wastesQuery && data?.createWaste?.waste) {
          cache.writeQuery({
            query: WASTES_QUERY,
            data: {
              wastes: wastesQuery.wastes.concat([data.createWaste.waste]),
            },
          });
        }
      },
      onCompleted: () => {
        router.push("/");
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addWaste({
      variables: {
        input: {
          waste: { lat: parseInt(latitude, 10), lng: parseInt(longitude, 10) },
        },
      },
    });
  };

  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");

  const handleLatitudeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLatitude(e.target.value);
    },
    [setLatitude],
  );

  const handleLongitudeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLongitude(e.target.value);
    },
    [setLongitude],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container={true}>
        <Grid item={true} xs={12}>
          <TextField
            required
            id="latitude"
            label={t("labels.latitude")}
            onChange={handleLatitudeChange}
            type="number"
            value={latitude}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            required
            id="longitude"
            label={t("labels.longitude")}
            onChange={handleLongitudeChange}
            type="number"
            value={longitude}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <Button color="secondary" variant="contained" type="submit">
            {t("common:labels.submit")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withApollo(Index);
