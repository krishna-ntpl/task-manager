import React, { useState } from 'react';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';
import { Dialog } from '@mui/material';

const App = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      
      <TaskBoard />
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <TaskForm onClose={() => setOpenForm(false)} />
      </Dialog>
    </div>
  );
};

export default App;
