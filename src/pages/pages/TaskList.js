import React from "react";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { Delete, Edit } from "@material-ui/icons";

const TableCell = styled(MuiTableCell)`
  padding: 4px;
`;

const TaskList = ({ tasks, updateTask, removeTask, markCompleted }) => {
  return (
    <Paper>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
        >
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow
                hover
                role="checkbox"
                aria-checked={task.completed}
                tabIndex={-1}
                key={index}
                selected={task.completed}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={task.completed}
                    inputProps={{ "aria-labelledby": index }}
                    onChange={(e) => {
                      markCompleted({ ...task, completed: e.target.checked });
                    }}
                  />
                </TableCell>
                <TableCell component="th" id={index} scope="row">
                  <Typography
                    color={"primary"}
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <span onClick={() => updateTask(task)}>
                    <IconButton aria-label="delete">
                      <Edit />
                    </IconButton>
                  </span>
                  <span onClick={() => removeTask(task.id)}>
                    <IconButton aria-label="delete">
                      <Delete />
                    </IconButton>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TaskList;
