import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { useTaskContext } from '../context/TaskContext';
import { Button, Card, Typography, Dialog, Select, MenuItem, Box } from '@mui/material';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const { tasks, moveTask, deleteTask } = useTaskContext();
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDrop = (taskId, status) => {
    moveTask(taskId, status);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setOpenForm(true);
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === 'all' || task.status === filterStatus
  );

  const columns = {
    'to-do': { title: 'To-do', tasks: filteredTasks.filter((task) => task.status === 'to-do') },
    'in-progress': { title: 'In Progress', tasks: filteredTasks.filter((task) => task.status === 'in-progress') },
    completed: { title: 'Completed', tasks: filteredTasks.filter((task) => task.status === 'completed') },
  };

  return (
    <Box p={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager App
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" onClick={handleCreateTask}>
          Create Task
        </Button>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          displayEmpty
          style={{ minWidth: '200px' }}
        >
          <MenuItem value="all">All Tasks</MenuItem>
          <MenuItem value="to-do">To-Do</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </Box>

      <Box display="flex" justifyContent="space-between">
        {Object.entries(columns).map(([status, column]) => (
          <Droppable key={status} types={['task']} onDrop={(data) => {handleDrop(data.task, status)
            console.log("ondrop")}
          }>
            
            <Box
              style={{
                width: '30%',
                margin: '0 10px',
                padding: '10px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                minHeight: '300px',
              }}
              onDragOver={(e) => e.preventDefault()} // Needed to allow dropping
            >
              <Typography variant="h6" align="center">
                {column.title}
              </Typography>
              {column.tasks.map((task) => (
                <Draggable key={task.id} type="task" data={task.id} draggable={true}>
                  <Card
                    style={{
                      padding: '10px',
                      margin: '10px 0',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                    }}
                    onClick={() => handleEditTask(task)}
                  >
                    <Typography variant="body1">{task.title}</Typography>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </Card>
                </Draggable>
              ))}
            </Box>
          </Droppable>
        ))}
      </Box>

      {/* Task form dialog for editing/creating tasks */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <TaskForm task={selectedTask} onClose={() => setOpenForm(false)} />
      </Dialog>
    </Box>
  );
};

export default TaskManager;