import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalWindow.css';

let userData = null;

function EditUserModal(props) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [dataSet, setDataSet] = useState(false);
    const [disabled, setDisabled] = useState(false);

    function setInitaialData() {
        userData = props.userInfo;

        setName(props.userInfo.name);
        setLastName(props.userInfo.lastName);
        setDob(props.userInfo.dob);
        setDataSet(true);
    }


    console.log("userData", userData);
    console.log("props.userInfo", props.userInfo);
    console.log("dataSet", dataSet);

    if (userData !== props.userInfo) {
        if (props.userInfo!==null && !dataSet) {
            console.log("props.userInfo!==null && !dataSet");
            setInitaialData();
        }        
    } else if (userData !== null && !dataSet && 
        (name !== userData.name || lastName !== userData.lastName || dob !== userData.dob)) {
            console.log("different values");
        setInitaialData();
        setDataSet(false);
    }

    console.log("name", name);

    function editData() {
        resetData();
        props.editUserInfo(props.userInfo.id, name, lastName, dob);
    }

    function deleteUser() {
        resetData();
        props.deleteUser(props.userInfo.id);
    }

    function closeModal() {
        resetData();
        props.handleClose();
    }

    function resetData(){
        setDataSet(false);
    }

    if (name.length > 0 && lastName.length > 0 && dob.length > 0 &&  disabled) {
        setDisabled(false);
    } else if ((name.length === 0 || lastName.length === 0 || dob.length === 0) && !disabled) {
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
                    <Modal.Title>Edit user information</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="entryField">
                        <span className="fieldText">Name:</span>
                        <input type="text" className="inputText" 
                            onChange={event => setName(event.target.value)}
                            value={name}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Last name:</span>
                        <input type="text" className="inputText"
                            onChange={event => setLastName(event.target.value)}
                            value={lastName}/>
                    </div>
                    <div className="entryField">
                        <span className="fieldText">Date of birth:</span>
                        <input type="date" className="inputDate"
                            onChange={event => setDob(event.target.value)}
                            defaultValue={dob}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" className="deleteButton" onClick={deleteUser}>Delete</Button>
                    <div className="basicButtons">
                        <Button variant="primary" disabled={disabled} onClick={editData}>Done</Button>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditUserModal;