import React, { Component } from "react";

class Task extends Component {
  state = {
    task: {
      description: "Task 1",
      startDate: "2020-11-05",
      endDate: "2020-11-05",
      status: "On Going",
    },
  };
  render() {
    return (
      <table>
        <tr>
          <td>{this.state.task.description}</td>
          <td>{this.getDate(this.state.task.startDate)}</td>
          <td>{this.getDate(this.state.task.endDate)}</td>
          <td className="buttons">
            <span
              className={this.getStatusClasses()}
            >
              {this.state.task.status}
            </span>
            <span className="hidden hidden-buttons">
              {this.state.task.status !== "Exceeded" && (
                <span
                  className="status status-update"
                >
                  UPDATE
                </span>
              )}
              <span
                className="status status-delete"
              >
                DELETE
              </span>
            </span>
          </td>
        </tr>
      </table>
    );
  }

  getStatusClasses() {
    let classes = "status status-";
    if (this.state.task.status !== "Exceeded") {
      if (this.state.task.status === "Done") {
        classes += "done";
      } else {
        classes += "on-going";
      }
    } else {
      classes += "exceeded";
    }
    return classes;
  }
  getDate(date) {
    let startDate = new Date(date);
    return startDate.toLocaleDateString();
  }
}

export default Task;
