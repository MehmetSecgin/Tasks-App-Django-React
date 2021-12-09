import { Component } from "react";
import "./App.scss";
import AllTasks from "./components/allTasks";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: "1",
          description: "Task 1",
          startDate: "2020-11-05",
          endDate: "2020-11-05",
          status: "On Going",
        },
        {
          id: "2",
          description: "Task 2",
          startDate: "2020-11-05",
          endDate: "2020-11-05",
          status: "Done",
        },
        {
          id: "3",
          description: "Task 3",
          startDate: "2020-11-05",
          endDate: "2020-11-05",
          status: "Exceeded",
        },
      ],
    };
  }

  // To change the state of the tasks
  handleStateChange = (task) => {
    // Right Now it changes the status but to show it we need to re-render the tasks. I'm going to implement an api call here later on.
    if (task.status !== "Exceeded") {
      task.status === "On Going"
        ? (task.status = "Done")
        : (task.status = "On Going");
    }
    console.log(task);
  };

  render() {
    return (
      <div className="App">
        <AllTasks
          tasks={this.state.tasks}
          onStateChange={this.handleStateChange}
        />
      </div>
    );
  }
}

export default App;
