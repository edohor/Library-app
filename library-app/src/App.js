import React, { useState } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BookList from './components/Books/BookList';
import UsersList from './components/Users/UsersList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/books"} component={BookList} />
        <Route exact path={"/users"} component={UsersList} />
        <Route exact path={"/"} component={Homepage}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
