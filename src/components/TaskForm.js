import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Button, TextField, DialogActions } from '@mui/material';

const TaskForm = ({ task, onClose }) => {
  const { addTask, editTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('to-do');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newTask = {
      id: task ? task.id : Date.now(),
      title,
      description,
      status,
    };

    if (task) {
      editTask(newTask);
       // Edit existing task
    } else {
      addTask(newTask); // Create new task
    }

    onClose(); // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', width: '400px' }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginTop: '20px' }}
      />
      <TextField
        fullWidth
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginTop: '20px' }}
        select
        SelectProps={{
          native: true,
        }}
      >
        <option value="to-do">To-do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </TextField>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </form>
  );
};

export default TaskForm;
