import React, { Component } from "react";

class TaskList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tasks !== this.props.tasks;
  }

  render() {
    const { tasks, onComplete } = this.props;
    return (
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => onComplete(index)}>Finish</button>
          </li>
        ))}
      </ul>
    );
  }
}

class CompletedTaskList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.completedTasks !== this.props.completedTasks;
  }

  render() {
    const { completedTasks, onDelete, onMoveBack } = this.props;
    return (
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => onDelete(index)}>Delete</button>
            <button onClick={() => onMoveBack(index)}>Move Back</button>
          </li>
        ))}
      </ul>
    );
  }
}

class App extends Component {
  state = {
    tasks: [],
    completedTasks: [],
    newTask: "",
  };

  addTask = () => {
    const { newTask, tasks } = this.state;
    if (newTask) {
      this.setState({
        tasks: [...tasks, newTask],
        newTask: "",
      });
    }
  };

  completeTask = (index) => {
    const { tasks, completedTasks } = this.state;
    const task = tasks[index];
    this.setState({
      tasks: tasks.filter((_, i) => i !== index),
      completedTasks: [...completedTasks, task],
    });
  };

  deleteTask = (index) => {
    const { completedTasks } = this.state;
    this.setState({
      completedTasks: completedTasks.filter((_, i) => i !== index),
    });
  };

  moveBackToTasks = (index) => {
    const { tasks, completedTasks } = this.state;
    const task = completedTasks[index];
    this.setState({
      completedTasks: completedTasks.filter((_, i) => i !== index),
      tasks: [...tasks, task],
    });
  };

  handleInputChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  render() {
    const { tasks, completedTasks, newTask } = this.state;

    return (
      <div>
        <h2>To Be Performed</h2>
        <input
          value={newTask}
          onChange={this.handleInputChange}
          placeholder="New task"
        />
        <button onClick={this.addTask}>Add</button>

        <TaskList tasks={tasks} onComplete={this.completeTask} />

        <h2>Completed Tasks</h2>
        <CompletedTaskList
          completedTasks={completedTasks}
          onDelete={this.deleteTask}
          onMoveBack={this.moveBackToTasks}
        />
      </div>
    );
  }
}

export default App;
