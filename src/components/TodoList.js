import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

import TodoDetails from './TodoDetails';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectTodo,
  removeTodo,
  toggleStatus
} from '../features/todo/todoSlice';

export default function TodoList() {
  const todoList = useSelector(selectTodo);
  const dispatch = useDispatch();
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null)
  const handleOpen = (todo, id) => {
    setSelectedTodo({ ...todo, id });
    setIsOpenDetails(true);
  }
  const handleClose = () => setIsOpenDetails(false);

  return (
    <div>
      <h3>
        Unfinished To-Do List
      </h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((row, id) => {
              if (row.status === 0) {
                return (
                  <TableRow
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                    <TableCell align="right">{row.status === 0 ? "Unfinished" : "Finished"}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleOpen(row, id)}>Update</Button>
                      <Tooltip title="Finish it">
                        <Button onClick={() => dispatch(toggleStatus({ id: id }))}>
                          <CheckIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete it">
                        <Button onClick={() => dispatch(removeTodo(id))}>
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              } return null
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>
        Finished To-Do List
      </h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((row, id) => {
              if (row.status === 1) {
                return (
                  <TableRow
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                    <TableCell align="right">{row.status === 1 ? "Finished" : " Unfinished"}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleOpen(row, id)}>Update</Button>
                      <Tooltip title="Unfinish it">
                        <Button onClick={() => dispatch(toggleStatus({ id: id }))}>
                          <ClearIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              } return null
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TodoDetails open={isOpenDetails} handleClose={handleClose} selectedTodo={selectedTodo} />
    </div>
  );
}
