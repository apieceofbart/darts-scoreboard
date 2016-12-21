import React from 'react'
import { connect } from 'react-redux'
import { addPlayer } from '../actions'

let AddPlayer = ({ dispatch }) => {
  let input;

  const onSubmit = e => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    dispatch(addPlayer(input.value));
    input.value = '';
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={node => { input = node; }} />
        <button type="submit">Add Player</button>
      </form>
    </div>
  )
}

AddPlayer = connect()(AddPlayer);

export default AddPlayer;
