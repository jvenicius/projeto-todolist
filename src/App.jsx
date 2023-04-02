import React from 'react';
import { Container } from '@mui/material';
import { createGlobalStyle } from 'styled-components';
import Grid from '@mui/material/Unstable_Grid2';
import AddTask from './components/AddTask';
import Task from './components/Task';
import Footer from './components/Footer';

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
        taskToUpdate.title = updatedTask.title;
        taskToUpdate.description = updatedTask.description;
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

    const GlobalStyle = createGlobalStyle`
      body {
        background: #ccc;
        width: auto;
      }
    `
    return (
      <Container maxWidth="xl" sx={{display: 'flex', flexDirection: 'column'}}>
        <GlobalStyle />
        <AddTask
          onCreate={this.createTask}
        />
        <Grid container spacing={2} sx={{mt: 5}}>
          {tasks.map((task) => (
            <Grid xs={12} md={4}>
              <Task
                key={task.id}
                data={task}
                onRemove={this.removeTask}
                onUpdate={this.updateTask}
                hasFinished={task.hasFinished}
              />
            </Grid>
          ))}
        </Grid>
        <Footer/>
      </Container>
    );
  }
}

export default App;
