import React, { useState } from "react";
import PropType from "prop-types";
import styled from "styled-components";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import generators from "../lib/generators";

export default function AddTask({ onCreate }) {
  const initialState = {
    id: 0,
    title: "",
    description: "",
    hasFinished: false,
  };
  const [task, setTask] = useState(initialState);
  const { randomId } = generators;
  // SNACKBAR
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleInputTitle(event) {
    setTask({
      ...task,
      id: randomId(999999),
      title: event.target.value,
    });
  }

  function handleInputDescription(event) {
    setTask({
      ...task,
      id: randomId(999999),
      description: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (task.id > 0) {
      onCreate(task);
      setTask(initialState);
      handleClick();
    }
  }

  const styleForm = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 0,
    borderRadius: 5,
    my: 2,
  };

  const styleTextField = {
    mb: 2,
  };

  const Title = styled.h1`
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;700&display=swap");
    font-size: 2.5rem;
    text-align: center;
    font-family: "Noto Sans Mono", monospace;
    font-weight: 700;
    color: #000;
    margin: 0;

    @media screen and (max-width: 720px) {
      font-size: 2rem;
    }
  `;

  const boxStyle = {
    backgroundColor: "#fff",
    borderRadius: "15px",
    paddingRight: "3%",
    paddingLeft: "3%",
    paddingBottom: "3%",
    paddingTop: "1%",
    width: window.screen.width > 480 ? "60%" : "90%",
    margin: "auto",
    marginTop: "2%",
  };

  return (
    <Box style={boxStyle}>
      <Title>Adicionar tarefa</Title>
      <form onSubmit={handleSubmit} style={styleForm}>
        <TextField
          id="title-input"
          name="title"
          label="Título"
          placeholder="Dê um título para sua tarefa"
          onChange={(event) => handleInputTitle(event)}
          value={task.title}
          helperText="* Digite ao menos 3 caracteres"
          margin="normal"
          sx={styleTextField}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />

        {window.screen.width > 480 ? (
          <TextField
            id="description-input"
            name="description"
            label="Descrição"
            placeholder="Descreva sua tarefa"
            onChange={(event) => handleInputDescription(event)}
            value={task.description}
            fullWidth
            margin="normal"
            sx={styleTextField}
            InputLabelProps={{
              shrink: true,
            }}
            rows={5}
            multiline
          />
        ) : (
          ""
        )}
        <Button
          id="submitButton"
          type="submit"
          variant="contained"
          fullWidth
          margin="normal"
          disabled={task.title.length < 3}
        >
          Adicionar tarefa
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Sua tarefa foi criada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

AddTask.propTypes = {
  onCreate: PropType.func.isRequired,
  onError: PropType.func.isRequired,
}.isRequired;
