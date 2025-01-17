import React from "react";
import Chart from 'chart.js/auto';
import {Doughnut, Pie } from 'react-chartjs-2';


function PieChart({ data }) {
  if (!data || !data.labels || !data.datasets || data.labels.length === 0) {
    return <div className="not-available-text">No data available</div>;
  }

  return (
    <div>
      <Doughnut className="uniquewidth" data={data}  />
    </div>
  );
}

export default PieChart;
