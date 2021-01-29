import React from "react";

export default function DateFieldCellRenderer(props) {
  debugger;
  const { value } = props;

  return <span>{value ? new Date(value).toDateString() : ""}</span>;
}
