import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class ModalUpdate extends Component {
  render() {
    const { modal, task } = this.props;
    return (
      <Modal
        show={modal.show}
        onHide={() => this.props.onClose(modal.name)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Description of the Task"
                defaultValue={task.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                name="startDate"
                type="date"
                defaultValue={task.startDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                name="endDate"
                type="date"
                defaultValue={task.endDate}
              />
            </Form.Group>
            <Button
              onClick={() => this.props.onClose(modal.name)}
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

export default ModalUpdate;
