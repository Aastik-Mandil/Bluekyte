import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CustomDialog from "../components/CustomDialog";
import CustomInputLabel from "../components/CustomInputLabel";
import {
  MdModeEdit,
  MdDeleteOutline,
} from "react-icons/md";
import { doAjax } from "../Utility/service";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("tm_token");

  const getTasks = () => {
    doAjax(
      token,
      `http://localhost:5000/tasks`,
      "GET",
      null
    )
      .then((data) => {
        if (data?.status) {
          setTasks(data?.data || []);
        } else {
          setTasks([]);
        }
      })
      .catch((err) => {
        setTasks([]);
      });
  };
  const createTask = () => {
    doAjax(
      token,
      `http://localhost:5000/tasks`,
      "POST",
      selectedTask
    )
      .then((data) => {
        if (data?.status) {
          getTasks();
        }
        setOpen(false);
        setSelectedTask(null);
      })
      .catch((err) => {
        setTasks([]);
      });
  };
  const updateTask = () => {
    doAjax(
      token,
      `http://localhost:5000/tasks/${selectedTask?._id}`,
      "PATCH",
      selectedTask
    )
      .then((data) => {
        if (data?.status) {
          getTasks();
        }
        setOpen(false);
        setSelectedTask(null);
      })
      .catch((err) => {
        setTasks([]);
      });
  };
  const deleteTask = (id) => {
    doAjax(
      token,
      `http://localhost:5000/tasks/${id}`,
      "DELETE",
      null
    )
      .then((data) => {
        if (data?.status) {
          getTasks();
        }
      })
      .catch((err) => {
        setTasks([]);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      style={{
        padding: 10,
        height: "calc(100% - 32px - 16px)",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        style={{ padding: "8px 0px" }}
      >
        <Typography>{`Tasks (${
          tasks?.length || 0
        })`}</Typography>

        <Button
          variant="contained"
          style={{
            textTransform: "capitalize",
          }}
          onClick={() => {
            setOpen(true);
            setSelectedTask(null);
          }}
        >
          Add Task
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold" }}
                align="right"
              >
                Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold" }}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks?.map((task, ind) => (
              <TableRow
                key={ind}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    whiiteSpace: "nowrap",
                  }}
                >
                  {task?.title}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    whiiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {task?.description}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    whiiteSpace: "nowrap",
                  }}
                >
                  {task?.status === "completed"
                    ? "Completed"
                    : "Pending"}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    whiiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => {
                        setOpen(true);
                        setSelectedTask(task);
                      }}
                    >
                      <MdModeEdit />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => {
                        deleteTask(task?._id);
                      }}
                    >
                      <MdDeleteOutline />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomDialog
        title={open ? "New Task" : "Update Task"}
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedTask(null);
        }}
        size="lg"
        dialogActions={
          <>
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                marginTop: 30,
              }}
              onClick={() => {
                setOpen(false);
                setSelectedTask(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                marginTop: 30,
              }}
              onClick={() => {
                if (selectedTask?._id) {
                  updateTask();
                } else {
                  createTask();
                }
              }}
              disabled={
                selectedTask?.title?.length === 0 ||
                selectedTask?.description?.length === 0 ||
                selectedTask?.status?.length === 0
              }
            >
              Save
            </Button>
          </>
        }
      >
        <div
          // className="border p-6 rounded-lg"
          style={{
            border: "1px solid transparent",
            padding: 24,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            background: "rgb(246 246 246)",
          }}
        >
          <div className="">
            <CustomInputLabel required={true}>
              Title
            </CustomInputLabel>

            <TextField
              size="small"
              variant="outlined"
              value={selectedTask?.title}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="">
            <CustomInputLabel required={true}>
              Description
            </CustomInputLabel>

            <TextField
              size="small"
              variant="outlined"
              value={selectedTask?.description}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="">
            <CustomInputLabel required={true}>
              Status
            </CustomInputLabel>

            <Select
              size="small"
              variant="outlined"
              fullWidth
              value={selectedTask?.status}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  status: e.target.value,
                })
              }
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"completed"}>
                Completed
              </MenuItem>
            </Select>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}

export default Home;
