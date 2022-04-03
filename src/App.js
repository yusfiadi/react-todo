import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import {
  setInitialTodo
} from './features/todo/todoSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const handleOpen = () => {
    setIsOpenCreateModal(true);
  }
  const handleClose = () => setIsOpenCreateModal(false);


  /* eslint-disable */
  useEffect(() => {
    axios.get("https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list").then((response) => {
      dispatch(setInitialTodo(response.data))
    })
  }, [])
  /* eslint-enable */

  return (
    <div className="App">
      <Container>
        <TodoList />
        <Button variant='outlined' onClick={handleOpen} style={{marginTop: "20px"}}>
          Add new Todo
        </Button>
        <CreateTodo open={isOpenCreateModal} handleClose={handleClose} />
      </Container>
    </div>
  );
}

export default App;
