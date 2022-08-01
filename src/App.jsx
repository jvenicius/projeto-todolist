import React from 'react';
import { Container, Typography } from '@mui/material';
import AddTask from './components/AddTask';
import Task from './components/Task';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
    };

    this.createTask = this.createTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  componentDidMount() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    if (localStorageTasks) {
      this.setState({
        tasks: localStorageTasks,
      });
    }
  }

  createTask(newTask) {
    const { tasks } = this.state;
    const updatedTasks = [...tasks, newTask];
    this.setState({ tasks: updatedTasks });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  updateTask(updatedTask) {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) => {
      const taskToUpdate = task;
      if (taskToUpdate.id === updatedTask.id) {
        taskToUpdate.hasFinished = updatedTask.hasFinished;
      }
      return taskToUpdate;
    });
    this.setState({
      tasks: updatedTasks,
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  removeTask(id) {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: updatedTasks,
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  render() {
    const { tasks } = this.state;
    return (
      <Container maxWidth="sm">
        <Typography sx={{ fontSize: '1.8rem', weight: 500 }} align="center">
          jv - Lista de tarefas
        </Typography>
        <AddTask onCreate={this.createTask} />
        {tasks.map((task) => (
          <Task
            key={task.id}
            data={task}
            onRemove={this.removeTask}
            onUpdate={this.updateTask}
            hasFinished={task.hasFinished}
          />
        ))}
      </Container>
    );
  }
}

export default App;
