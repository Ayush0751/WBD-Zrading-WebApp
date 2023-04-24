/* eslint-disable */
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function TraderChart(props) {
  const [data, setData] = useState({
    ...props.chartData,
  });
  return (
    <div>
      <Bar
        // options={...}
        data={data}
        // {...props}
      />
    </div>
  );
}

export default TraderChart;
