import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, createTodos, patchTodos, deleteTodos } from "./apis/queries";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const [addTask, setAddTask] = useState('')
  const [todoStatus, setTodoStatus] = useState({
    all: false, active: false, completed: false
  })

  //Get all Todos
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getTodos"],
    queryFn: getTodos,
  });

  // Creating New Todos
  const { mutate: createMutate, isPending, isError: isCreateError, error: createTodoError } = useMutation({
    mutationKey: ["createTodos"],
    mutationFn: createTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTodos"], refetchType: "active", });
    },
  });

  // Update Todos
  const { mutate: mutatePatch, isPending: isPatchPending, isError: isPatchError, error: patchTodoError } = useMutation({
    mutationKey: ["patchTodos"],
    mutationFn: patchTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTodos"], refetchType: "active", });
    },
  });


  // Delete Todos
  const { mutate: mutateDelete, isPending: isDeletePending, isError: isDeleteError, error: deleteTodoError } = useMutation({
    mutationKey: ["deleteTodos"],
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTodos"], refetchType: "active", });
    },
  });


  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  function handleOnChange(value) {
    setAddTask(value);
  }

  function handleSave(addTask) {
    console.log("New Todo : ", addTask);
    createMutate(addTask);
    setAddTask('');
  }

  function handleClick(e, todo) {
    mutatePatch({ status: !todo.completed, id: todo.id })
  }

  function handleClearAll() {
    mutateDelete()
  }

  function handleStatus(e, key) {
    if (key == 'all')
      setTodoStatus({
        all: true,
        active: false,
        completed: false
      });

    if (key == 'active')
      setTodoStatus({
        all: false,
        active: true,
        completed: false
      });

    if (key == 'completed')
      setTodoStatus({
        all: false,
        active: false,
        completed: true
      });
  }


  // return (
  //   <>
  //     {data.result.map(todo => {
  //       return <p key={todo.text}
  //         onClick={(e) => handleClick(e, todo)}>{todo.text}</p>
  //     })}
  //     <button onClick={() => handleSave("Test2")}>Add New</button>
  //     <div>
  //       <p>All : {data.count?.[0].completed_true + data.count?.[0].completed_false}</p>
  //       <p>Active : {data.count?.[0].completed_false}</p>
  //       <p>Completed : {data.count?.[0].completed_true}</p>
  //     </div>
  //   </>
  // )

  return (
    <Box sx={{ minHeight: "50vh" }}>
      {/* TOP GRADIENT */}
      <Box
        sx={{
          height: "45vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm">
          {/* HEADER */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pt={6}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                letterSpacing: "0.6rem",
                fontWeight: 700,
              }}
            >
              TODO
            </Typography>
            <Typography sx={{ fontSize: 22 }}>
              <WbSunnyIcon />
            </Typography>
          </Stack>
        </Container>
      </Box>
      {/* CARD */}
      <Container sx={{ width: '45%' }}>
        <Box
          sx={{
            mt: "-140px",
            bgcolor: "#1E2533",
            borderRadius: "8px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          {/* HEADER - FIXED */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* INPUT */}
            <TextField
              variant="standard"
              placeholder="Create a new todo..."
              sx={{
                p: 2,
                width: '95%',
                "& input::placeholder": {
                  color: "#9AA4BF",
                  opacity: 1,
                },
                "& input": {
                  color: "#fff",
                },
              }}
              onChange={(e) => handleOnChange(e.target.value)}
            >
              {addTask}
            </TextField>
            {addTask && <CheckIcon sx={{ p: 3.5, cursor: "pointer" }} onClick={() => handleSave(addTask)} />}
          </Box>

          {/* TODOS TABLE - SCROLLABLE */}
          <Box
            sx={{
              maxHeight: "265px", // Approximately 5 rows (each row ~53px)
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.05)",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255,255,255,0.2)",
                borderRadius: "4px",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              },
            }}
          >
            {data.result.map((todo, i) =>{
              // console.log("Todo : ",todo.completed);
                return(
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      color: "#E4E7F2",
                    }}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onClick={(e) => handleClick(e, todo)}
                      icon={
                        <RadioButtonUncheckedIcon
                          sx={{ color: "rgba(255,255,255,0.3)" }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleIcon
                          sx={{
                            background: "green",
                            borderRadius: "50%",
                            color: "#fff",
                          }}
                        />
                      }
                      sx={{ p: 0 }}
                    />
                    <Typography
                      sx={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        color: todo.completed ? "#6C77A0" : "#E4E7F2",
                        transition: "0.2s",
                      }}
                    >
                      {todo.text}
                    </Typography>
                  </Box>
                )}
              )}
          </Box>

          {/* FOOTER - FIXED */}
          <Stack
            direction="row"
            justifyContent="space-between"
            px={2}
            py={1.5}
            sx={{ color: "#6C77A0", fontSize: 13 }}
          >
            <span>{data.count?.[0].completed_false + data.count?.[0].completed_true} items left</span>
            <Stack direction="row" spacing={2}>
              <span onClick={(e) => handleStatus(e, 'all')} style={{ color: "#5A7CFF" }}>All</span>
              <span onClick={(e) => handleStatus(e, 'active')}>Active {data.count?.[0].completed_false}</span>
              <span onClick={(e) => handleStatus(e, 'completed')}>Completed {data.count?.[0].completed_true}</span>
            </Stack>
            {data.count?.[0].completed_true > 0 && <span style={{ cursor: "pointer" }} onClick={() => handleClearAll()}>Clear Completed</span>}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
