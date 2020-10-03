import React from 'react';
import './App.css';
import {useUser} from "./components/AuthButton";
import { Context, ThemeContextProvider, ThemeContextConsumer} from './components/CurrentCollection';



import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {CollectionContainer} from './components/CollectionContainer'
import {WorkEntry} from './components/WorkEntry'
import {NavBar as AppNavBar} from './components/NavBar'
import {MultiCardComponent} from './components/MultiCardComponent'
import {ContextPrinter} from './components/ContextPrinter'
import { ManageCollection } from './components/ManageCollection';

function App() {
  const user = useUser();
  return (
    <div className="App">
      <ThemeContextProvider>
<header>
 <AppNavBar />
</header>
<div className="container">
<Router>
        <Switch>
        <Route path="/manageCollections">
            <div className="row mt-5">
              <div className="row">
                <ManageCollection />
              </div>
              
            </div>
          </Route>
          <Route path="/newWork">
            <div className="row mt-5">
              <div className="row">
                <WorkEntry />
              </div>
              
            </div>
          </Route>
          <Route path="/rateMine">
            <div className="row mt-5">
              <div className="row">
              {user && <CollectionContainer ><ContextPrinter userId={user.uid} /> </CollectionContainer> }
              </div>
              
            </div>
          </Route>
          <Route path="/">
           {user && <CollectionContainer ><MultiCardComponent userId={user.uid} /> </CollectionContainer> }
          </Route>          
        </Switch>
    </Router>

</div>
</ThemeContextProvider>
</div>
  );
}

export default App;
