import React from "react";
import MapGL, {
  Source,
  Layer,
  PointerEvent,
  ViewportProps,
} from "react-map-gl";
import { GeoJSONSource } from "mapbox-gl";

// Using any here because the types for Layer are incorrect
export const clusterLayer: any = {
  id: "clusters",
  type: "circle",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

// Using any here because the types for Layer are incorrect
export const clusterCountLayer: any = {
  id: "cluster-count",
  type: "symbol",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export const WasteMap = () => {
  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  // Using any here because react-map-gl doesn't export a type for Source
  const sourceRef = React.useRef<any>(null);
  const onClick = React.useCallback(
    (event: PointerEvent) => {
      if (event.features.length > 0) {
        const feature = event.features[0];
        if ((feature.layer.id = clusterLayer.id)) {
          const clusterId = feature.properties.cluster_id;
          const mapboxSource:
            | GeoJSONSource
            | undefined = sourceRef.current?.getSource();

          mapboxSource?.getClusterExpansionZoom(
            clusterId,
            (err: Error, zoom: number) => {
              if (err) {
                return;
              }

              setViewport({
                ...viewport,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                zoom,
                transitionDuration: 500,
              });
            },
          );
        }
      }
    },
    [sourceRef, setViewport, viewport],
  );
  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      interactiveLayerIds={[clusterLayer.id]}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onClick={onClick}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
    >
      <Source
        type="geojson"
        data="/api/wastes"
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        ref={sourceRef}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </MapGL>
  );
};
