import React, { useState } from 'react';
import PropType from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Checkbox, Button, Typography, Modal } from '@mui/material';

function Task({ data, onRemove, onUpdate, hasFinished }) {

  const [toggleModal, setToggleModal] = useState(false);

  function handleModal() {
    const toggleModalUpdated = !toggleModal;
    setToggleModal(toggleModalUpdated)
    console.log(toggleModal)
  }

  function handleCheckbox(event) {
    const hasFinishedUpdated = event.target.checked;
    onUpdate({
      ...data,
      hasFinished: hasFinishedUpdated,
    });
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
          bgcolor: '#fff'
        }}
      >
        <Checkbox
          onChange={(event) => handleCheckbox(event)}
          checked={hasFinished}
        />

        <Box
          component="div"
          sx={{
            cursor: "pointer"
          }}
          onClick={() => handleModal()}
        >
          <Typography sx={{fontWeight: '700'}}>{data.title}</Typography>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data.description}
          </Typography>
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
