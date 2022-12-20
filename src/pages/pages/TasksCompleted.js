import React from "react";
import styled from "styled-components/macro";
import CardComponent from "../../components/CardComponent";
import { Typography } from "@material-ui/core";

const CompletedTasks = styled(Typography)`
  color: #5285ec;
  padding-top: 14px;
  font-size: 64px;
  font-weight: bold;
`;

const TasksCompleted = ({ completedTasks, totalTasks }) => {
  return (
    <CardComponent header={"Tasks Completed"}>
      <CompletedTasks display={"inline"} variant={"h1"}>
        {completedTasks}
      </CompletedTasks>
      <Typography display={"inline"} variant={"h6"}>
        / {totalTasks}
      </Typography>
    </CardComponent>
  );
};

export default TasksCompleted;
