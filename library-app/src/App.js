import React from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BookList from './components/Books/BookList';
import UsersList from './components/Users/UsersList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/books"} render={BookList} />
        <Route exact path={"/users"} render={UsersList} />
        <Route exact path={"/"} render={Homepage}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
