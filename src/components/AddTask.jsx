import React, { useState } from 'react';
import PropTypes from 'prop-types';
import generators from '../lib/generators';

export default function AddTask({ onCreate }) {
  const initialState = { id: 0, title: '', hasFinished: false };
  const [task, setTask] = useState(initialState);
  const { randomId } = generators;
  function handleInput(event) {
    setTask({ id: randomId(999999), title: event.target.value });
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
      <input type="text" onChange={handleInput} value={task.title} />
      <button type="submit">Adicionar tarefa</button>
    </form>
  );
}

AddTask.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
