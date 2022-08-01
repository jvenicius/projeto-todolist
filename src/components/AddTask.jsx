import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import generators from '../lib/generators';

export default function AddTask({ onCreate }) {
  const initialState = { id: 0, title: '', hasFinished: false };
  const [task, setTask] = useState(initialState);
  const { randomId } = generators;
  function handleInput(event) {
    setTask({
      ...initialState,
      id: randomId(999999),
      title: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (task.id > 0) {
      onCreate(task);
      setTask(initialState);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="title-input"
        variant="outlined"
        label="Título"
        onChange={(event) => handleInput(event)}
        value={task.title}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      >
        Adicionar tarefa
      </Button>
    </form>
  );
}

AddTask.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
