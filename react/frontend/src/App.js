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
      modals: {
        delete: {
          name: "delete",
          show: false,
          id: "",
        },
        add: {
          name: "add",
          show: false,
        },
        update: {
          name: "update",
          editing: false,
          show: false,
        },
      },
    };

    // Binding Functions
    this.fetchTasks = this.fetchTasks.bind(this);
    this.startDelete = this.startDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.clearActiveItem = this.clearActiveItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }

  // When the App.js mounts, It will fetch the tasks from the server
  componentDidMount() {
    this.fetchTasks();
  }

  // To Retreive the tasks from the database
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

  // To securely send/Receive data, taken from django docs
  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // To change active item in order to send the updated data
  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        [name]: value,
      },
    });
  }

  // To clear the active item in state
  clearActiveItem() {
    this.setState({
      activeItem: {
        id: null,
        description: "",
        startDate: "",
        endDate: "",
        status: "On Going",
      },
    });
  }

  // Submits the data to server for Adding and Updating the data
  handleSubmit(e) {
    e.preventDefault();

    var csrfToken = this.getCookie("csrftoken");

    var url = "http://127.0.0.1:8000/task-create/";

    if (this.state.modals.update.editing === true) {
      url = `http://127.0.0.1:8000/task-update/${this.state.activeItem.id}/`;
      this.handleEdit("", false);
    }

    this.sendData(url, csrfToken, "POST", this.state.activeItem)
      .then((response) => {
        this.fetchTasks();
        this.clearActiveItem();
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }

  // Sends DELETE request to server in order to delete the task
  deleteTask() {
    var csrfToken = this.getCookie("csrftoken");
    var id = this.state.modals.delete.id;

    var url = `http://localhost:8000/task-delete/${id}/`;
    this.sendData(url, csrfToken, "DELETE", id)
      .then((response) => {
        this.fetchTasks();
        this.handleModalVisibility("delete", false);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }

  // Repetitive fetch function
  sendData(url, csrfToken, method, data = "") {
    return fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
  }

  // To fill the update form with that tasks info. If 'start' is false, clears and hides Update Modal
  handleEdit(task, start) {
    this.handleModalVisibility("update", start);
    this.setState((prevstate) => ({
      ...prevstate,
      activeItem: task,
      modals: {
        ...prevstate.modals,
        update: {
          ...prevstate.modals.update,
          editing: start,
        },
      },
    }));
  }

  // Added the id field here for future use. Going to need it for the delete api call.
  startDelete(task) {
    this.handleModalVisibility("delete", true);
    this.setState((prevstate) => ({
      modals: {
        ...prevstate.modals,
        delete: {
          ...prevstate.modals.delete,
          id: task.id,
        },
      },
    }));
  }

  // Show/Hide Modals
  handleModalVisibility = (modalName, doShow) => {
    console.log("Opening Modal: ", modalName);
    this.setState((prevstate) => ({
      modals: {
        ...prevstate.modals,
        [modalName]: {
          ...prevstate.modals[modalName],
          show: doShow,
        },
      },
    }));
  };

  // To change the state of the tasks
  handleStateChange = (task) => {
    if (task.status !== "Exceeded") {
      task.status === "On Going"
        ? (task.status = "Done")
        : (task.status = "On Going");
    }

    var csrfToken = this.getCookie("csrftoken");

    var url = `http://127.0.0.1:8000/task-update/${task.id}/`;
    
    this.sendData(url, csrfToken, "POST", task)
      .then(this.fetchTasks)
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  };

  render() {
    return (
      <div className="App">
        <ModalDelete
          modal={this.state.modals.delete}
          onClose={this.handleModalVisibility}
          onDelete={this.deleteTask}
        />
        <ModalAdd
          modal={this.state.modals.add}
          onClose={this.handleModalVisibility}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <ModalUpdate
          modal={this.state.modals.update}
          task={this.state.activeItem}
          onClose={this.handleModalVisibility}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <AllTasks
          tasks={this.state.tasks}
          onStateChange={this.handleStateChange}
          onDelete={this.startDelete}
          onAdd={this.handleModalVisibility}
          onUpdate={this.handleEdit}
        />
      </div>
    );
  }
}

export default App;
