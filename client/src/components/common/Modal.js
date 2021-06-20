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
                {
                    props.buttons ? props.buttons.map((btn, index) => 
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ) : 
                    <Button 
                        style={{ backgroundColor: '#333' }}
                        {...props} 
                        className="btn-sm" 
                        variant="primary" 
                        onClick={props.handleSubmit}
                    >
                        Save
                    </Button>
                }
                
            </Modal.Footer>
        </Modal>
    )
}

export default CommonModal