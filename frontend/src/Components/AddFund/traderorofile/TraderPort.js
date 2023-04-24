/* eslint-disable */
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "asset", headerName: "Asset Nam", width: 110 },
  { field: "firstName", headerName: "Buy/Sell", width: 110 },
  //   { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Invested",
    type: "number",
    width: 110,
  },
  {
    field: "fullName",
    headerName: "P/L(%)",
    description: "Profit / Loss Percentage.",
    sortable: false,
    width: 110,

  },
  {
    field: "value",
    headerName: "Value",
    description: "Current Value in Percentage",
    sortable: false,
    width: 110,

  },
];

const rows = [
  { id: 1, asset: "Tata", firstName: "Buying", age: "35%" , value:"6.5%"},
  { id: 2, asset: "Tata", firstName: "Buying", age: "42%",value:"6.5%" },
  { id: 3, asset: "Tata", firstName: "Buying", age: "45%",value:"6.5%" },
  { id: 4, asset: "Tata", firstName: "Selling", age: "16%",value:"6.5%" },
  { id: 5, asset: "Tata", firstName: "Selling", age: "55%" ,value:"6.5%"},
  { id: 6, asset: "Tata", firstName: "Selling", age: "15%0" ,value:"6.5%"},
  { id: 7, asset: "Tata", firstName: "Buying", age: "44%",value:"6.5%" },
  { id: 8, asset: "Tata", firstName: "Buying", age: "36%" ,value:"6.5%"},
  { id: 9, asset: "Tata", firstName: "Buying", age: "65%" ,value:"6.5%"},
  { id: 10, asset: "Tata", firstName: "Buying", age: "65%" ,value:"6.5%"},
  { id: 11, asset: "Tata", firstName: "Buying", age: "65%" ,value:"6.5%"},
  { id: 12, asset: "Tata", firstName: "Buying", age: "65%",value:"6.5%" },
  { id: 13, asset: "Tata", firstName: "Buying", age: "65%" ,value:"6.5%"},
  { id: 14, asset: "Tata", firstName: "Buying", age: "65%" ,value:"6.5%"},
];
function TraderPort() {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        // rowsPerPageOptions={3}
        checkboxSelection={false}
      />
    </div>
  );
}

export default TraderPort;
