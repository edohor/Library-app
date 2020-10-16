import React, { useState } from 'react';
import './UsersList.css';
import Searchbar from '../Searchbar/Searchbar';
import AddUserModal from '../ModalWindow/AddUserModal';
import EditUserModal from '../ModalWindow/EditUserModal';
import BookRentModal from '../ModalWindow/BookRentModal';

function UsersList () {

    const [users, setUsers] = useState(
        (localStorage.getItem("users")!==null && JSON.parse(localStorage.getItem("users")).length>0) ? 
        JSON.parse(localStorage.getItem("users")) : []
        );
    const [books, setBooks] = useState(
        (localStorage.getItem("books")!==null && JSON.parse(localStorage.getItem("books")).length>0) ? 
        JSON.parse(localStorage.getItem("books")) : []
        );
    const [ addUserModalOpened, setAddUserModalOpened ] = useState(false);
    const [ editUserModalOpened, seteditUserModalOpened ] = useState(false);
    const [ bookRentModalOpened, setbookRentModalOpened ] = useState(false);
    const [ search, setSearch ] = useState(false);
    const [ userEditInfo, setUserEditInfo ] = useState(null);
    const [ userRentInfo, setUserRentInfo ] = useState(null);
    const [ searchResults, setSearchResults ] = useState(false);

    const searchBooks = (value) => {
        setSearch(value);

        if (value.length > 0) {
            setSearchResults(true)
        }
    }

    function openAddBookPopup () {
        setAddUserModalOpened(true);
    }

    function openEditBookPopup (id, index) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id===id) {
                setUserEditInfo(users[i]);                
            }            
        }
        
        seteditUserModalOpened(true);

    }

    function editUserInfo (id, name, lastName, dob, books) {
        let obj = {id: id, name: name, lastName: lastName, dob: dob, books: books};

        for(let i=0; i<users.length; i++){
            if(users[i].id === id){
                users.splice(i, 1, obj);
            }
        }

        localStorage.setItem("users", JSON.stringify(users));

        setUsers(JSON.parse(localStorage.getItem("users")));

        closeModal();
    }

    function deleteUser (id){
        for(let i=0; i<users.length; i++){
            if(users[i].id === id){
                users.splice(i, 1);
            }
        }

        localStorage.setItem("users", JSON.stringify(users));

        setUsers(JSON.parse(localStorage.getItem("users")));

        for (let i = 0; i < books.length; i++) {
            if (books[i].rentedTo === id) {
                let bookObj = {id: books[i].id, author: books[i].author, title: books[i].title, available: true, rentedTo: []};

                books.splice(i, 1, bookObj);

                localStorage.setItem("books", JSON.stringify(books));

                setBooks(JSON.parse(localStorage.getItem("books")));
            }
        }

        closeModal();
    }

    function closeModal() {
        setAddUserModalOpened(false);
        seteditUserModalOpened(false);
        setbookRentModalOpened(false);
    }

    function saveNewUser(name, lastName, dob) {
        setAddUserModalOpened(false);
        
        // find largest id number and set it as id for new book
        let largestId = 0;
        if(users.length>0){
            let checkIds = users.reduce((a, c) => (a[c.id] = c, a), {});
            largestId = Math.max(...Object.keys(checkIds))+1;
        }

        let obj = {id: largestId, name: name, lastName: lastName, dob: dob, books: []};
        users.push(obj);

        localStorage.setItem("users", JSON.stringify(users));

        setUsers(JSON.parse(localStorage.getItem("users")));
        
    }

    function openRentBookPopup (id) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id===id) {
                setUserRentInfo(users[i]);                
            }            
        }

        setbookRentModalOpened(true);
    }
    
    let editButton = [];
    let rentButton = [];
    let availableText = [];

    let tableInfo = [];
    if(searchResults){
        if (users.length>0){
            let filteredList = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].name.toLowerCase().includes(search.toLowerCase()) || users[i].lastName.toLowerCase().includes(search.toLowerCase())) {
                    filteredList.push(users[i]);
                }
            }


            tableInfo = filteredList.map((users, index) => {
                editButton = <div onClick={() => openEditBookPopup(users.id, index)} className="editButton">Edit</div>
                rentButton = <div onClick={() => openRentBookPopup(users.id, index)} className="editButton">Rent</div>

                return (<tr className="tableRow">
                            <td>{users.name}</td>
                            <td>{users.lastName}</td>
                            <td>{users.dob}</td>
                            <td>{rentButton}</td>
                            <td>{editButton}</td>
                        </tr>)            
            })
        }

    } else {
        if (users.length>0){
            tableInfo = users.map((users, index) => {
                editButton = <div onClick={() => openEditBookPopup(users.id, index)} className="editButton">Edit</div>
                rentButton = <div onClick={() => openRentBookPopup(users.id, index)} className="editButton">Rent</div>

                return (<tr className="tableRow">
                            <td>{users.name}</td>
                            <td>{users.lastName}</td>
                            <td>{users.dob}</td>
                            <td>{rentButton}</td>
                            <td>{editButton}</td>
                        </tr>)            
            })
        }
    }

    return (
        <div>
            <Searchbar search={e => searchBooks(e)}/>
            <div className="booksContainer">
                <button onClick={openAddBookPopup} className="bookButton">Add new user</button>

                <table className="booksTable">
                    <tr>
                        <th>Name</th>
                        <th>Last name</th>
                        <th>Date of birth</th>
                        <th>Rent/Return</th>
                        <th></th>
                    </tr>
                    {tableInfo}
                </table>
            </div>

            <AddUserModal show={addUserModalOpened}
                handleClose={closeModal}
                saveNewUser={saveNewUser}/>

            <EditUserModal show={editUserModalOpened}
                handleClose={closeModal}
                saveNewUser={saveNewUser}
                userInfo={userEditInfo}
                editUserInfo={editUserInfo}
                deleteUser={deleteUser}/>
                
                
            <BookRentModal show={bookRentModalOpened}
                handleClose={closeModal}
                saveNewUser={saveNewUser}
                userInfo={userRentInfo}
                editUserInfo={editUserInfo}
                deleteUser={deleteUser}/>
        </div>
    )
}

export default UsersList;