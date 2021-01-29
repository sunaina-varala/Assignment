import React from "react";

export default function NullCellRenderer(props) {
  const { value } = props;

  return <span>{value || "-"}</span>;
}
