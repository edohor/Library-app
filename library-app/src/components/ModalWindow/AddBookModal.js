import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalWindow.css';

function AddBookModal(props) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [disabled, setDisabled] = useState(true);

    function closeModal() {
        setAuthor("");
        setTitle("");
        props.handleClose();
    }

    function saveClose() {
        setAuthor("");
        setTitle("");
        props.saveNewBook(author, title);
    }

    if (author.length > 0 && title.length > 0 && disabled) {
        setDisabled(false);
    } else if ((author.length === 0 || title.length === 0) && !disabled) {
        setDisabled(true);
    }

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
                            onChange={event => setAuthor(event.target.value)}
                            value={author}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Title:</span>
                        <input type="text" className="inputText"
                            onChange={event => setTitle(event.target.value)}
                            value={title}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" disabled={disabled} onClick={saveClose}>Done</Button>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddBookModal;