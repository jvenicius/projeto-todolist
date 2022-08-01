import React from 'react';
import PropType from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Checkbox, Button, Typography } from '@mui/material';
import styled from 'styled-components';

function Task({ data, onRemove, onUpdate, hasFinished }) {
  function handleCheckbox(event) {
    const hasFinishedUpdated = event.target.checked;
    onUpdate({
      ...data,
      hasFinished: hasFinishedUpdated,
    });
  }

  const Title = styled(Typography)`
    font-size: 1.2rem;

    text-decoration: ${() => (hasFinished ? 'line-through' : 'none')};

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  `;

  return (
    <Box
      component="div"
      sx={{
        p: 2,
        border: '1px solid #2196f3',
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Checkbox
        onChange={(event) => handleCheckbox(event)}
        checked={hasFinished}
      />
      <Title>{data.title}</Title>
      <Button variant="contained" onClick={() => onRemove(data.id)}>
        <DeleteIcon />
      </Button>
    </Box>
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
