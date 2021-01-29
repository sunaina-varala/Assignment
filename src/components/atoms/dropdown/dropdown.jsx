import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Dropdown = ({
  title,
  options,
  changeHandler,
  defaultValue,
  ...other
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    changeHandler(event.target.value);
  };

  return (
    <div {...other}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {options.map((item, index) => (
            <MenuItem key={item + index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
Dropdown.defaultProps = {
  title: "",
  options: [],
  changeHandler: void 0,
  defaultValue: ""
};
Dropdown.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  changeHandler: PropTypes.func,
  defaultValue: PropTypes.string
};
export default Dropdown;
