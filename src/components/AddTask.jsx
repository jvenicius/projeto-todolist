import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import generators from '../lib/generators';

export default function AddTask({ onCreate }) {
  const initialState = { id: 0, title: '', description: '', hasFinished: false };
  const [task, setTask] = useState(initialState);
  const [hasError, setHasError] = useState({ title: false, description: false });
  const { randomId } = generators;

  function verifyInputTitleError(event) {
    const { name, value } = event.target;
    const errorToUpdate = {...hasError};
    errorToUpdate[name] = value.length <= 3;
    setHasError(errorToUpdate)
    console.log(hasError)
  }

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
    }
  }

  const styleForm = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const style = {
    mb: 2,
    maxWidth: 600
  }

  return (
    <form onSubmit={handleSubmit} style={styleForm}>
      <TextField
        id="title-input"
        name="title"
        label="Título"
        onChange={(event) => handleInputTitle(event)}
        onBlur={(event) => verifyInputTitleError(event)}
        value={task.title}
        fullWidth
        margin="normal"
        sx={style}
        InputLabelProps={{
          shrink: true
        }}        
      />

      <TextField
        id="description-input"
        name="description"
        label="Descrição"
        onChange={(event) => handleInputDescription(event)}
        value={task.description}
        fullWidth
        margin="normal"
        sx={style}
        InputLabelProps={{
          shrink: true
        }}
        rows={5}
        multiline
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        margin="normal"
        sx={style}
      >
        Adicionar tarefa
      </Button>
    </form>
  );
}

AddTask.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
