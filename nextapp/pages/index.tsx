import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { useUser } from "./_app";
import { withApollo } from "../apollo/client";
import { WasteMap } from "../components/index/WasteMap";
import { PageWrapper } from "../components/PageWrapper";
import { MapPane, MapControl } from "../components/MapPane";

const Index = () => {
  const { t } = useTranslation("index");

  const { loading: userLoading, user } = useUser();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <WasteMap>
      <MapPane position="bottomright">
        <MapControl>
          <Fab color="primary" aria-label="add" href="/create_waste">
            <AddIcon />
          </Fab>
        </MapControl>
      </MapPane>
    </WasteMap>
  );
};

export default withApollo(Index);
