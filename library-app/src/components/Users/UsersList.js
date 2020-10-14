import React, { useState } from 'react';
import './UsersList.css';
import Searchbar from '../Searchbar/Searchbar';

function UsersList() {
    const [ modalOpened, setModalOpened ] = useState(false);
    const [ search, setSearch ] = useState(false);

    const searchUsers = (value) => {
        console.log("value", value);
        setSearch(value);
    }

    function openAddUserPopup () {
        console.log("openAddUserPopup");
        setModalOpened(true);

    }

    function openEditUserPopup () {
        console.log("openEditUserPopup");
        setModalOpened(true);
        
    }

    return (
        <div>
            <Searchbar search={e => searchUsers(e)}/>
            <div className="usersContainer">
                <button onClick={openAddUserPopup} className="addUserButton">Add new user</button>

                <table className="usersTable">
                    <tr>
                        <th>Name</th>
                        <th>Last name</th>
                        <th>DOB</th>
                        <th>Rent/Return</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>n</td>
                        <td>l</td>
                        <td>d</td>
                        <td>r</td>
                        <td onClick={openEditUserPopup}>e</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default UsersList;