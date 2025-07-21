import Chart from 'chart.js/auto';

//--------------------------------------------------PIE CHART--------------------------------------------------
// Keep a reference to the chart, so we can update it
let myChart;

// Custom plugin for center text
const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw(chart) {
    const { ctx, chartArea: { top, bottom, left, right }, data } = chart;
    const width = right - left;
    const height = bottom - top;
    const xCenter = left + width / 2;
    const yCenter = top + height / 2;

    // Sum up all data points to display in center
    const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText(`$${total}`, xCenter, yCenter);
    ctx.restore();
  }
};

// Color palette for slices
const barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145",
  "#a05d56",
  "#ff8c00",
  "#6b486b",
  "#d0743c",
  "#98abc5"
];

// Hardcoded data
const labels = ["Oil Change", "Tire Rotation", "Brake Inspection", "Battery Check"];
const values = [1500, 800, 1200, 600]; // Example revenue values

// Create the chart
myChart = new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [{
      backgroundColor: barColors,
      data: values
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "REVENUE OF SERVICES"
      }
    }
  },
  plugins: [centerTextPlugin]
});
