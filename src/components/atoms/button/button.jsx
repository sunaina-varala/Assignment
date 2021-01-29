import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function Btn({ variant, color, text, clickHandler }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant={variant} color={color} onClick={clickHandler}>
        {text}
      </Button>
    </div>
  );
}
Btn.defaultProps = {
  variant: "contained",
  color: "primary",
  text: "",
  clickHandler: void 0
};
Btn.propTypes = {
  variant: PropTypes.oneOf(["contained", "outline"]),
  color: PropTypes.string,
  text: PropTypes.string,
  clickHandler: PropTypes.func
};
