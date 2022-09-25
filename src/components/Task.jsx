import React, { useState } from 'react';
import PropType from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Checkbox,
  Button,
  Typography,
  Modal,
  Divider,
  TextField,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Task({ data, onRemove, onUpdate, hasFinished }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [task, setTask] = useState(data);

  const redTheme = createTheme({ palette: { primary: red } });

  function updateTask() {
    onUpdate(task);
  }

  function handleInputTitle(event) {
    setTask({
      ...task,
      title: event.target.value,
    });
  }

  function handleInputDescription(event) {
    setTask({
      ...task,
      description: event.target.value,
    });
  }

  function handleModal() {
    const { width } = window.screen;
    if (width >= 480) {
      const toggleModalUpdated = !toggleModal;
      setToggleModal(toggleModalUpdated);
    }
  }

  function handleCheckbox(event) {
    const hasFinishedUpdated = event.target.checked;
    onUpdate({
      ...data,
      hasFinished: hasFinishedUpdated,
    });
  }

  function handleEditModal() {
    updateTask(task);
    setEditModal(!editModal);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #2196f3',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          p: 2,
          border: '1px solid #2196f3',
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#fff',
        }}
      >
        <Checkbox
          onChange={(event) => handleCheckbox(event)}
          checked={hasFinished}
        />

        <Box
          component="div"
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => handleModal()}
        >
          <Typography sx={{ fontWeight: '700' }}>{data.title}</Typography>
        </Box>

        <Button variant="contained" onClick={() => onRemove(data.id)}>
          <DeleteIcon />
        </Button>
      </Box>
      <Modal
        open={toggleModal}
        onClose={() => handleModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: '700' }}
          >
            {editModal ? (
              <TextField
                id="title-input"
                onChange={(event) => {
                  handleInputTitle(event);
                }}
                value={task.title}
                variant="outlined"
                label="Título"
                fullWidth
                margin="none"
              />
            ) : (
              task.title
            )}
          </Typography>
          {editModal ? '' : <Divider color="#000" />}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {editModal ? (
              <TextField
                id="description-input"
                label="Descrição"
                onChange={(event) => {
                  handleInputDescription(event);
                }}
                value={task.description}
                fullWidth
                margin="none"
                InputLabelProps={{
                  shrink: true,
                }}
                rows={5}
                multiline
              />
            ) : (
              task.description
            )}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
              textAlign: 'justify',
            }}
          >
            <ThemeProvider theme={redTheme}>
              <Button
                variant="contained"
                onClick={() => onRemove(data.id)}
                color="primary"
              >
                Excluir
              </Button>
            </ThemeProvider>
            {editModal ? (
              <Button variant="contained" onClick={() => handleEditModal()}>
                Salvar
              </Button>
            ) : (
              <Button variant="contained" onClick={() => handleEditModal()}>
                Editar
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

Task.propTypes = {
  data: PropType.shape({
    id: PropType.number,
    title: PropType.string,
  }),
  onUpdate: PropType.func,
  onRemove: PropType.func,
  checked: PropType.bool,
}.isRequired;

export default Task;
