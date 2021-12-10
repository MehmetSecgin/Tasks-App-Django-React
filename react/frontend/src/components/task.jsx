import React, { Component } from "react";

class Task extends Component {
  render() {
    const { task, onStateChange, onUpdate, onDelete } = this.props;
    return (
      <tr>
        <td>{task.description}</td>
        <td>{this.getDate(task.startDate)}</td>
        <td>{this.getDate(task.endDate)}</td>
        <td className="buttons">
          <span
            onClick={() => onStateChange(task)}
            className={this.getStatusClasses()}
          >
            {task.status}
          </span>
          <span className="buttons hidden hidden-buttons">
            {task.status === "On Going" && (
              <span
                onClick={() => onUpdate(task,true)}
                className="status status-update"
              >
                UPDATE
              </span>
            )}
            <span
              onClick={() => onDelete(task)}
              className="status status-delete"
            >
              DELETE
            </span>
          </span>
        </td>
      </tr>
    );
  }

  getStatusClasses() {
    let classes = "status status-";
    if (this.props.task.status !== "Exceeded") {
      if (this.props.task.status === "Done") {
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
