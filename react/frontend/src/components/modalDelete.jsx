import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class modalDelete extends Component {
    render() {
      const { modal} = this.props;
      console.log("MODAL: ",modal)
      return (
        <Modal show={modal.show} onHide={() => this.props.onClose(modal.name)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
              <Button  variant="danger">
                  Yes, Delete
              </Button>
              <Button onClick={() => this.props.onClose(modal.name)} variant="secondary">
                  No, I changed My Mind
              </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  
  export default modalDelete;
