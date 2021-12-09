import React, { Component } from "react";
import Task from "./task";

class AllTasks extends Component {
  state = {
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
  render() {
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
            {this.state.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllTasks;
