import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Required for styling the Modals
import "./App.scss";
import AllTasks from "./components/allTasks";
import ModalDelete from "./components/modalDelete";
import ModalAdd from "./components/modalAdd";
import ModalUpdate from "./components/modalUpdate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeItem: {
        id: null,
        description: "",
        startDate: "",
        endDate: "",
        status: "On Going",
      },
      deleteModal: {
        name: "deleteModal",
        show: false,
        id: "",
      },
      addModal: {
        name: "addModal",
        show: false,
      },
      updateModal: {
        name: "updateModal",
        show: false,
      },
    };

    // Binding Functions
    this.startDelete = this.startDelete.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }

  // When the App.js mounts, It will fetch the tasks from the server
  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    console.log("Fetching...");
    fetch("http://127.0.0.1:8000/task-list/")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          tasks: data,
        })
      );
  }

  // To fill the update form with that tasks info
  startEdit(task) {
    this.handleShowModal("updateModal");
    this.setState({
      activeItem: task,
    });
  }

  // Added the id field here for future use. Going to need it for the delete api call.
  startDelete(task) {
    this.setState({
      deleteModal: {
        name: "deleteModal",
        id: task.id,
        show: true,
      },
    });
  }

  // Show/Hide Modals
  handleShowModal = (modalName) => {
    console.log("Closing Modal: ", modalName);
    this.setState({
      [modalName]: {
        name: [modalName],
        show: true,
      },
    });
  };
  handleHideModal = (modalName) => {
    console.log("Closing Modal: ", modalName);
    this.setState({
      [modalName]: {
        name: [modalName],
        show: false,
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
        <ModalAdd modal={this.state.addModal} onClose={this.handleHideModal} />
        <ModalDelete
          modal={this.state.deleteModal}
          onClose={this.handleHideModal}
        />
        <ModalUpdate
          modal={this.state.updateModal}
          onClose={this.handleHideModal}
          task={this.state.activeItem}
        />
        <AllTasks
          tasks={this.state.tasks}
          onStateChange={this.handleStateChange}
          onDelete={this.startDelete}
          onAdd={this.handleShowModal}
          onUpdate={this.startEdit}
        />
      </div>
    );
  }
}

export default App;
