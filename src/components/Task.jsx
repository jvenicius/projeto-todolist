import React from 'react';
import PropType from 'prop-types';

function Task({ data, onRemove, onUpdate, hasFinished }) {
  function handleCheckbox(event) {
    const hasFinishedUpdated = event.target.checked;
    onUpdate({
      ...data,
      hasFinished: hasFinishedUpdated,
    });
  }
  return (
    <div>
      <input type="checkbox" onChange={handleCheckbox} checked={hasFinished} />
      {data.title}
      <button type="button" onClick={() => onRemove(data.id)}>
        Remover
      </button>
    </div>
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
