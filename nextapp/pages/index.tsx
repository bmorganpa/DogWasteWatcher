import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { withApollo } from "../apollo/client";
import { WasteMap } from "../components/index/WasteMap";
import { MapPane, MapControl } from "../components/MapPane";

const Index = () => {
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
