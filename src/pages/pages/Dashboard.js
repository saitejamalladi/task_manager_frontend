import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import styled, { withTheme } from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Add, SearchOutlined } from "@material-ui/icons";
import TaskList from "./TaskList";
import LatestTasks from "./LatestTasks";
import TasksCompleted from "./TasksCompleted";
import ChartComponent from "./ChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../redux/actions/dashboardActions";
import { listTasks } from "../../redux/actions/taskActions";
import { createTask, removeTask, updateTask } from "../../services/taskService";
import CardComponent from "../../components/CardComponent";

const Spacer = styled.div(spacing);

const TasksHeader = styled(Typography)`
  color: #537178;
  font-weight: bold;
  margin-left: 0.5rem;
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: block;
  position: relative;
  width: 100%;
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;
  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)}px;
    padding-right: ${(props) => props.theme.spacing(2.5)}px;
    padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
    padding-left: ${(props) => props.theme.spacing(12)}px;
    width: 160px;
  }
`;

const Dashboard = ({ theme }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [newTaskDialog, setNewTaskDialog] = useState(false);
  const [editTaskDialog, setEditTaskDialog] = useState(false);
  const [name, setName] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const dashboard = useSelector((state) => state.dashboardReducer);
  const { tasks } = useSelector((state) => state.taskReducer);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //To fetch the updated Dashboard
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  //To fetch the updated tasks
  useEffect(() => {
    dispatch(listTasks(searchText));
  }, [searchText]);

  const refreshDashboard = () => {
    dispatch(getDashboardData());
    dispatch(listTasks(searchText));
  };
  const handleCreateTask = async () => {
    setLoading(true);
    await createTask(name);
    refreshDashboard();
    setName("");
    setNewTaskDialog(false);
    setLoading(false);
  };
  const initEditTask = (task) => {
    setEditTask(task);
    setEditTaskDialog(true);
  };
  const handleEditTask = async () => {
    setLoading(true);
    await updateTask(editTask);
    refreshDashboard();
    setEditTask(null);
    setEditTaskDialog(false);
    setLoading(false);
  };
  const markCompleted = async (editTask) => {
    setLoading(true);
    await updateTask(editTask);
    refreshDashboard();
    setLoading(false);
  };
  const handleRemoveTask = async (taskId) => {
    await removeTask(taskId);
    refreshDashboard();
  };

  return (
    <React.Fragment>
      {dashboard && dashboard.totalTasks > 0 ? (
        <React.Fragment>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <TasksCompleted
                completedTasks={dashboard.tasksCompleted}
                totalTasks={dashboard.totalTasks}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LatestTasks list={dashboard.latestTasks} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ChartComponent
                completedTasks={dashboard.tasksCompleted}
                totalTasks={dashboard.totalTasks}
              />
            </Grid>
          </Grid>
          <Spacer mb={8} />
          <Container>
            <Grid
              container
              justify={"space-between"}
              spacing={4}
              alignContent={"center"}
            >
              <Grid item xs={12} sm={"auto"} style={{ textAlign: "center" }}>
                <TasksHeader variant="h4" gutterBottom display="inline">
                  Tasks
                </TasksHeader>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={"auto"}
                    style={{ textAlign: "center" }}
                  >
                    <Search>
                      <SearchIconWrapper>
                        <SearchOutlined />
                      </SearchIconWrapper>
                      <Input
                        placeholder="Search by task name"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </Search>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={"auto"}
                    style={{ textAlign: "center" }}
                  >
                    <Button
                      startIcon={<Add />}
                      variant={"contained"}
                      color="primary"
                      onClick={() => setNewTaskDialog(true)}
                      fullWidth
                    >
                      New Task
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <Spacer mb={6} />
          <TaskList
            tasks={tasks}
            markCompleted={markCompleted}
            updateTask={initEditTask}
            removeTask={handleRemoveTask}
          />
          <div>
            <Dialog
              fullWidth={fullScreen}
              open={editTaskDialog}
              onClose={() => setEditTaskDialog(false)}
              aria-labelledby="form-edit-task"
            >
              <DialogTitle id="form-edit-task">Edit Task</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Task Name"
                  value={editTask?.name}
                  onChange={(e) =>
                    setEditTask({ ...editTask, name: e.target.value })
                  }
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setEditTaskDialog(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditTask}
                  color="primary"
                  disabled={!editTask?.name && !loading}
                  load
                >
                  {loading ? "Updating..." : "Update Task"}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </React.Fragment>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid item>
            <Card>
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant={"h4"}>You have no Task</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<Add />}
                      variant={"contained"}
                      color="primary"
                      onClick={() => setNewTaskDialog(true)}
                      fullWidth
                    >
                      New Task
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <div>
        <Dialog
          fullWidth={fullScreen}
          open={newTaskDialog}
          onClose={() => setNewTaskDialog(false)}
          aria-labelledby="form-create-task"
        >
          <DialogTitle id="form-create-task">Add Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewTaskDialog(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleCreateTask}
              color="primary"
              disabled={!name && !loading}
              load
            >
              {loading ? "Creating..." : "Create Task"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default withTheme(Dashboard);
