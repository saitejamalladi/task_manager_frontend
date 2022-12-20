import React from "react";
import styled from "styled-components/macro";
import CardComponent from "../../components/CardComponent";

const List = styled.ul`
  color: inherit;
`;
const ListItem = styled.li`
  padding: 2px;
  color: #8f9ea2;
`;

const LatestTasks = ({ list }) => {
  return (
    <CardComponent header={"Latest Created Tasks"}>
      <List>
        {list.map((task, index) => (
          <ListItem
            key={index}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.name}
          </ListItem>
        ))}
      </List>
    </CardComponent>
  );
};

export default LatestTasks;
