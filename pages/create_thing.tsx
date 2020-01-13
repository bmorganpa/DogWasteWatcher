import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { withApollo } from "../apollo/client";
import { THINGS_QUERY } from "./index";
import { AddThingMutation, ThingsListQuery } from "../__generated__/types";
import { AddThingMutationVariables } from "../__generated__/types";

const CREATE_THING_MUTATION = gql`
  mutation AddThingMutation($input: CreateThingInput!) {
    createThing(input: $input) {
      thing {
        id
        latitude
        longitude
      }
    }
  }
`;

const Index = () => {
  const { t } = useTranslation("create_thing");
  const router = useRouter();
  const [addThing] = useMutation<AddThingMutation, AddThingMutationVariables>(
    CREATE_THING_MUTATION,
    {
      update(cache, { data }) {
        const thingsQuery = cache.readQuery<ThingsListQuery>({
          query: THINGS_QUERY,
        });
        if (thingsQuery && data?.createThing?.thing) {
          cache.writeQuery({
            query: THINGS_QUERY,
            data: {
              things: thingsQuery.things.concat([data.createThing.thing]),
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

    addThing({
      variables: {
        input: {
          thing: { lat: parseInt(latitude, 10), lng: parseInt(longitude, 10) },
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
