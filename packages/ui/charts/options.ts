export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        color: "black",
        font: {
          size: 16,
        },
      },
    },
  },
};
