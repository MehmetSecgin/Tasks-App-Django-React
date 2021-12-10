import React, { Component } from "react";
import Task from "./task";

class AllTasks extends Component {
  render() {
    const { tasks, onStateChange, onDelete, onAdd, onUpdate } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr className="table-header">
              <th colSpan="3">Tasks</th>
              <th className="addTask">
                <span onClick={() => onAdd("addModal")}>Add Task</span>
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
                onUpdate={onUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllTasks;
