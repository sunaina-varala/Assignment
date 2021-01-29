import React, { useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import DateFieldCellRenderer from "../atoms/dateFieldCellRenderer/dateFieldCellRenderer";
import NullCellRenderer from "../atoms/nullCellRenderer/nullCellRenderer";
const Grid = ({ cols, data }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const modules = [
    ClientSideRowModelModule,
    RowGroupingModule,
    MenuModule,
    ColumnsToolPanelModule
  ];
  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      <AgGridReact
        onGridReady={onGridReady}
        rowData={data}
        modules={modules}
        columnDefs={cols}
        defaultColDef={{
          flex: 1,
          editable: false,
          resizable: true,
          sortable: true
        }}
        domLayout="autoHeight"
        frameworkComponents={{
          dateFieldCellRenderer: DateFieldCellRenderer,
          nullCellRenderer: NullCellRenderer
        }}
        groupIncludeFooter={true}
        groupIncludeTotalFooter={true}
      />
    </div>
  );
};
export default Grid;
