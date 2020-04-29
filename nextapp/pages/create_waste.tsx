import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { withApollo } from "../apollo/client";
import { AddWasteMutation } from "../__generated__/types";
import { AddWasteMutationVariables } from "../__generated__/types";

interface UsePositionPayload {
  position?: Position;
  error?: PositionError;
}

function usePosition(): UsePositionPayload {
  const [position, setPosition] = React.useState<Position>();
  const [error, setError] = React.useState<PositionError>();
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, setError);
  }, []);
  return { position, error };
}

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
  const [addWaste, { loading, error }] = useMutation<
    AddWasteMutation,
    AddWasteMutationVariables
  >(CREATE_WASTE_MUTATION, {
    onCompleted: () => {
      router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addWaste({
      variables: {
        input: {
          waste: {
            latitude: parseInt(latitude, 10),
            longitude: parseInt(longitude, 10),
          },
        },
      },
    });
  };

  const { position } = usePosition();
  const [latitude, setLatitude] = useState(
    position?.coords.latitude.toString() ?? "0",
  );
  const [longitude, setLongitude] = useState(
    position?.coords.longitude.toString() ?? "0",
  );

  React.useEffect(() => {
    if (position) {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    }
  }, [position]);

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
        {error?.graphQLErrors.map((e) => {
          return (
            <Grid key={e.message} item={true} xs={12}>
              <Typography color="error">{e.message}</Typography>
            </Grid>
          );
        })}
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
          <Button
            color="secondary"
            disabled={loading}
            variant="contained"
            type="submit"
          >
            {t("common:labels.submit")}
            {loading && <CircularProgress />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withApollo(Index);
