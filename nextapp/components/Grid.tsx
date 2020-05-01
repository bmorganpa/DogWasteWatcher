import React from "react";
import Grid from "@material-ui/core/Grid";
import { GridProps } from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useWrapperStyles = makeStyles((theme) => ({
  wrapper: {
    padding: ({ spacing }: GridProps) =>
      spacing ? theme.spacing(spacing) / 2.0 : 0,
  },
}));

export const GridWrapper = ({ children, ...props }: GridProps) => {
  const { wrapper } = useWrapperStyles(props);
  return (
    <div className={wrapper}>
      <Grid container={true} {...props}>
        {children}
      </Grid>
    </div>
  );
};

const useSpacerStyles = makeStyles((theme) => ({
  spacer: {
    width: ({ spacing }: GridProps) => (spacing ? theme.spacing(spacing) : 0),
  },
}));

export const GridSpacer = (props: Pick<GridProps, "spacing">) => {
  const { spacer } = useSpacerStyles(props);
  return <div className={spacer} />;
};
