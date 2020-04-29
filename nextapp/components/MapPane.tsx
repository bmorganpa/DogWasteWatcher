import { makeStyles } from "@material-ui/core/styles";

export type MapPaneProps = Readonly<{
  position: "topleft" | "topright" | "bottomleft" | "bottomright";
}>;

const useStyles: any = makeStyles(
  (theme) =>
    ({
      root: {
        position: "absolute",
        left: ({ position }: MapPaneProps) =>
          (position === "topleft" || position === "bottomleft") && 0,
        right: ({ position }: MapPaneProps) =>
          (position === "topright" || position === "bottomright") && 0,
        top: ({ position }: MapPaneProps) =>
          (position === "topleft" || position === "topright") && 0,
        bottom: ({ position }: MapPaneProps) =>
          (position === "bottomleft" || position === "bottomright") && 0,
        "& > div": {
          float: ({ position }: MapPaneProps) =>
            (position === "topleft" || position === "bottomleft") && "left",
          marginLeft: ({ position }: MapPaneProps) =>
            (position === "topleft" || position === "bottomleft") &&
            theme.spacing(2),
          marginRight: ({ position }: MapPaneProps) =>
            (position === "topright" || position === "bottomright") &&
            theme.spacing(2),
          marginTop: ({ position }: MapPaneProps) =>
            (position === "topleft" || position === "topright") &&
            theme.spacing(2),
          marginBottom: ({ position }: MapPaneProps) =>
            (position === "bottomleft" || position === "bottomright") &&
            theme.spacing(2),
        },
      },
    } as any),
);

export const MapPane: React.FC<MapPaneProps> = (props) => {
  const { children } = props;
  const classes = useStyles(props);
  return <div className={classes.root}>{children}</div>;
};

export const MapControl: React.FC = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};
