import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalWindow.css';

function AddBookModal(props) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                centered={true}
                keyboard={false}
                size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                animation={false}
                className="modal"
            >

                <Modal.Header>
                    <Modal.Title>Add new book</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="entryField">
                        <span className="fieldText">Author:</span>
                        <input type="text" className="inputText" 
                            onChange={event => setAuthor(event.target.value)}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Title:</span>
                        <input type="text" className="inputText"
                            onChange={event => setTitle(event.target.value)}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.saveNewBook(author, title)}>Done</Button>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddBookModal;