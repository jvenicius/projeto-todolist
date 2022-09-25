import React from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddTask from './components/AddTask';
import Task from './components/Task';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      errors: {
        title: false,
        description: false,
      },
    };

    this.createTask = this.createTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.verifyInputErrors = this.verifyInputErrors.bind(this);
  }

  componentDidMount() {
    this.loadTasksFromLocalStorage();
  }

  verifyInputErrors(inputInfo) {
    const { name, value } = inputInfo;
    const subvalue = value.trim();
    const data = { ...this.state };
    const { errors } = data;
    errors[name] = subvalue.length < 3;
    this.setState(errors);
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
    const { errors } = this.state;
    return (
      <Container maxWidth="xl">
        <Typography
          sx={{ fontSize: '3rem', fontFamily: 'Arial' }}
          align="center"
        >
          Lista de tarefas
        </Typography>
        <AddTask
          onCreate={this.createTask}
          onError={this.verifyInputErrors}
          dataError={errors}
        />
        <Grid container spacing={2}>
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
      </Container>
    );
  }
}

export default App;
