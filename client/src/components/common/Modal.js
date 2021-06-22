import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const CommonModal = ({
    size,
    show,
    setShow,
    modalTitle,
    children,
    buttons,
    handleSubmit
}) => {
    return (
        <Modal size={size} show={show} onHide={setShow}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {
                    buttons ? buttons.map((btn, index) =>
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ) :
                        <Button
                            style={{ backgroundColor: '#333' }}
                            className="btn-sm"
                            variant="primary"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default CommonModal