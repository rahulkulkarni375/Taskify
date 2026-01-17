import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTodos, createTodos } from "./apis/queries";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CheckIcon from '@mui/icons-material/Check';

const App = () => {
  const [addTask, setAddTask] = useState('')
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getTodos"],
    queryFn: getTodos,
  });
  const { mutate, isPending, error: createTodoError} = useMutation({
    mutationKey: ["createTodos"],
    mutationFn: createTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTodos"] });
    },
  });

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  function handleOnChange(value) {
    setAddTask(value);
  }

  function handleSave(addTask) {
    console.log("New Todo : ", addTask);
    mutate(addTask);
    setAddTask('');
  }

  function handleClick(e, todo) {
    console.log("Radio : ", { value: e.target.value, todo: todo.completed, todoId: todo.id })
  }

  return (
    <Box sx={{ minHeight: "50vh", }}>
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
              {/* TODO */}
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

          {/* TODOS (mock) */}
          {data.map((todo, i) => (
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
                      // background: "linear-gradient(135deg, #5A7CFF, #C77DFF)",
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

          ))}

          {/* FOOTER */}
          <Stack
            direction="row"
            justifyContent="space-between"
            px={2}
            py={1.5}
            sx={{ color: "#6C77A0", fontSize: 13 }}
          >
            <span>5 items left</span>
            <Stack direction="row" spacing={2}>
              <span style={{ color: "#5A7CFF" }}>All</span>
              <span>Active</span>
              <span>Completed</span>
            </Stack>
            <span>Clear Completed</span>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
