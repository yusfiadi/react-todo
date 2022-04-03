import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import {
  removeTodo,
  updateTodo,
} from '../features/todo/todoSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  marginTop: "20px"
}

export default function TodoDetails(props) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const [checked, setChecked] = useState(null);
  const handleChangeStatus = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = () => {
    dispatch(updateTodo({
      content: {
        title: title.length > 0 ? title : props.selectedTodo.title,
        description: description.length > 0 ? description : props.selectedTodo.description,
        status: checked === null ? props.selectedTodo.status : checked === true ? 1 : 0,
      },
      id: props.selectedTodo.id,
    }))
    props.handleClose()
  }

  const handleDelete = () => {
    dispatch(removeTodo(props.selectedTodo.id))
    props.handleClose()
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {props.selectedTodo && (
            <Box sx={style}>
              <Box sx={textFieldStyle}>
                <TextField label="Todo Title" color="primary" onChange={handleChangeTitle} defaultValue={props.selectedTodo.title} placeholder='Title' size='small' />
              </Box>
              <Box sx={textFieldStyle}>
                <TextField label="Todo Description" color="primary" onChange={handleChangeDescription} defaultValue={props.selectedTodo.description} placeholder='Description' size='small' />
              </Box>
              <Box sx={textFieldStyle}>
                <FormControlLabel control={<Switch defaultChecked={props.selectedTodo.status === 1} onChange={handleChangeStatus} inputProps={{ 'aria-label': 'controlled' }} />} label="Finished Todo" />
              </Box>
              <Box sx={textFieldStyle}>
                <Button variant="contained" onClick={handleSubmit}>Update</Button>
                <Button variant="text" color='error' onClick={handleDelete}>Delete</Button>
              </Box>
            </Box>

          )}
        </>
      </Modal>
    </div>
  );
}