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
        show: true,
      },
    };

    // Binding Functions
    this.startDelete = this.startDelete.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }

  startEdit(task) {
    this.handleShowModal("updateModal")
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
