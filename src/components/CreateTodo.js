import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  selectTodo
} from '../features/todo/todoSlice';
import { Typography } from '@mui/material';

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

export default function CreateTodo(props) {
  const todo = useSelector(selectTodo)
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const [checked, setChecked] = useState(false);
  const handleChangeStatus = (event) => {
    setChecked(event.target.checked);
  };
  let dt = new Date()
  const handleSubmit = () => {
    dispatch(addTodo({
      id: Math.max(...todo.map(object => {
        return object.id;
      })
      ) + 1,
      title,
      description,
      status: checked ? 1 : 0,
      createdAt: `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
    }))
    props.handleClose()
    setTitle("")
    setDescription("")
    setChecked(false)
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
          <Box sx={style}>
            <Typography variant='h6'>Create new todo</Typography>
            <Box sx={textFieldStyle}>
              <TextField label="Todo Title" color="primary" onChange={handleChangeTitle} value={title} placeholder='Title' size='small' required />
            </Box>
            <Box sx={textFieldStyle}>
              <TextField label="Todo Description" color="primary" onChange={handleChangeDescription} value={description} placeholder='Description' size='small' required />
            </Box>
            <Box sx={textFieldStyle}>
              <FormControlLabel control={<Switch value={checked} onChange={handleChangeStatus} inputProps={{ 'aria-label': 'controlled' }} />} label="Finished Todo" />
            </Box>
            <Box sx={textFieldStyle}>
              <Button variant="contained" onClick={handleSubmit} disabled={title.length === 0 || description.length === 0}>Create</Button>
            </Box>
          </Box>
        </>
      </Modal>
    </div>
  );
}