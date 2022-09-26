import React, { useState } from 'react';
import PropType from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import generators from '../lib/generators';

export default function AddTask({ onCreate, onError, dataError }) {
  const initialState = {
    id: 0,
    title: '',
    description: '',
    hasFinished: false,
  };
  const [task, setTask] = useState(initialState);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const { randomId } = generators;

  function handleDisableButton() {
    if (dataError.title || dataError.description) {
      setDisableSubmitButton(true);
    } else {
      setDisableSubmitButton(false);
    }
  }

  function handleError(event) {
    const { name, value } = event.target;
    const inputInfo = { name, value };
    onError(inputInfo);
    handleDisableButton();
  }

  function handleInputTitle(event) {
    setTask({
      ...task,
      id: randomId(999999),
      title: event.target.value,
    });
    handleError(event);
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
    alignItems: 'center',
    p: 0,
    borderRadius: 5,
    my: 2
  };

  const style = {
    mb: 2,
    maxWidth: 600,
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={styleForm}>
        <TextField
          id="title-input"
          name="title"
          label="Título"
          onChange={(event) => handleInputTitle(event)}
          value={task.title}
          error={dataError.title}
          helperText={dataError.title ? 'Digite ao menos 3 caracteres' : ''}
          margin="normal"
          sx={style}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
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
            shrink: true,
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
          disabled={disableSubmitButton}
        >
          Adicionar tarefa
        </Button>
      </form>
    </Box>
  );
}

AddTask.propTypes = {
  dataError: PropType.shape({
    title: PropType.boolean,
    description: PropType.boolean,
  }),
  onCreate: PropType.func.isRequired,
  onError: PropType.func.isRequired,
}.isRequired;
