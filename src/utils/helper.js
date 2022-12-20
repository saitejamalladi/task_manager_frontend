export const getChartData = (theme, completedTasks, totalTasks) => {
  return {
    labels: ["Completed Tasks", "Not Completed"],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: [
          theme.palette.secondary.main,
          theme.palette.grey[300],
        ],
        borderColor: "transparent",
      },
    ],
  };
};

export const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
};
