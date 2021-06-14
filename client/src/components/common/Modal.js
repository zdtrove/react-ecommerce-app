import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const CommonModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.setShow}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CommonModal