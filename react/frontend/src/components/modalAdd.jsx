import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class modalAdd extends Component {
  render() {
    const { modal, onClose } = this.props;
    console.log("ADD MODAL:", modal);
    return (
      <Modal show={modal.show} onHide={() => onClose(modal.name)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Description of the Task"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control name="startDate" type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control name="endDate" type="date" />
            </Form.Group>
            <Button
              onClick={() => onClose(modal.name)}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default modalAdd;
