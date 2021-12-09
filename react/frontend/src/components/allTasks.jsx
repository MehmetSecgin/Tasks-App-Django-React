import React, { Component } from "react";
import Task from "./task";

class AllTasks extends Component {
  render() {
    const { tasks, onStateChange,onDelete } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr className="table-header">
              <th colSpan="3">Tasks</th>
              <th className="addTask">
                <span>Add Task</span>
              </th>
            </tr>
            <tr>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onStateChange={onStateChange}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllTasks;
