import React from "react";
import styled from "styled-components/macro";
import CardComponent from "../../components/CardComponent";
import { Pie } from "react-chartjs-2";
import { chartOptions, getChartData } from "../../utils/helper";
import { withTheme } from "@material-ui/core";

const ChartWrapper = styled.div`
  height: 120px;
`;

const ChartComponent = ({ theme, completedTasks, totalTasks }) => {
  return (
    <CardComponent header={"Percentage Completion"}>
      <ChartWrapper>
        <Pie
          data={getChartData(theme, completedTasks, totalTasks)}
          options={chartOptions}
        />
      </ChartWrapper>
    </CardComponent>
  );
};

export default withTheme(ChartComponent);
