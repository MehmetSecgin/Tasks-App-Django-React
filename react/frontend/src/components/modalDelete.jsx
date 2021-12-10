import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class modalDelete extends Component {
  render() {
    const { modal, onClose, onDelete } = this.props;
    return (
      <Modal show={modal.show} onHide={() => onClose(modal.name)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={onDelete} variant="danger">
            Yes, Delete
          </Button>
          <Button onClick={() => onClose(modal.name)} variant="secondary">
            No, I changed My Mind
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default modalDelete;
