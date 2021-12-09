import React, { Component } from "react";

class Task extends Component {
  render() {
    // const { onStateChange } = this.props;
    // console.log(onStateChange)
    return (
      <tr>
        <td>{this.props.task.description}</td>
        <td>{this.getDate(this.props.task.startDate)}</td>
        <td>{this.getDate(this.props.task.endDate)}</td>
        <td className="buttons">
          <span
            onClick={() =>this.props.onStateChange(this.props.task)}
            className={this.getStatusClasses()}
          >
            {this.props.task.status}
          </span>
          <span className="buttons hidden hidden-buttons">
            {this.props.task.status !== "Exceeded" && (
              <span className="status status-update">UPDATE</span>
            )}
            <span className="status status-delete">DELETE</span>
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
