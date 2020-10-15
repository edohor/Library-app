import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalWindow.css';

function AddUserModal(props) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");

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
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="entryField">
                        <span className="fieldText">Name:</span>
                        <input type="text" className="inputText" 
                            onChange={event => setName(event.target.value)}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Last name:</span>
                        <input type="text" className="inputText" 
                            onChange={event => setLastName(event.target.value)}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Date of birth:</span>
                        <input type="date" className="inputDate" 
                            onChange={event => setDob(event.target.value)}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" 
                    onClick={() => props.saveNewUser(name, lastName, dob)}>Done</Button>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddUserModal;