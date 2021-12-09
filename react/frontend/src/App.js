import { Component } from "react";
import AllTasks from "./components/allTasks";
import ModalDelete from "./components/modalDelete";
import "bootstrap/dist/css/bootstrap.min.css"; // Required for styling the Modals
import "./App.scss";

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
      modals: {
        add: {
          name: "add",
          show: true,
        },
        delete: {
          name: "delete",
          show: false,
          id: "",
        },
      },
    };

    // Binding Functions
    this.startDelete = this.startDelete.bind(this);
  }

  // Added the id field here for future use. Going to need it for the delete api call.
  startDelete(task) {
    this.setState({
      modals: {
        delete: {
          name: "delete",
          id: task.id,
          show: true,
        },
      },
    });
  }

  handleShowModal = (modal) => {
    this.setState({
      modals: {
        [modal]: {
          show: true,
        },
      },
    });
  };
  handleHideModal = (modal) => {
    console.log(modal);
    this.setState({
      modals: {
        [modal]: {
          show: false,
        },
      },
    });
  };

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
        {/* <ModalAdd modal={this.state.modals.add} /> */}
        <ModalDelete
          modal={this.state.modals.delete}
          onClose={this.handleHideModal}
        />
        <AllTasks
          tasks={this.state.tasks}
          onStateChange={this.handleStateChange}
          onDelete={this.startDelete}
        />
      </div>
    );
  }
}

export default App;
