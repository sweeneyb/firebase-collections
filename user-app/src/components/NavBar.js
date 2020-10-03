import React, {useEffect, useState, useContext} from 'react';
import {Link } from 'react-router'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {AuthButton, useUser} from './AuthButton'
import "firebase/firestore";
import firebase from "firebase/app";
import { Context, ThemeContextProvider, ThemeContextConsumer} from './CurrentCollection';

const firestore = firebase.firestore();

export function NavBar(props) {
    const user = useUser();
    // const [currentCollection, setCurrentCollection] = useCurrentCollection();
    const [collections, setCollections] = useState([]);
    
    useEffect(() => {
        if(user) {
            console.log(user.uid)
            firestore.collection("users/"+user.uid+"/collections").get()
            .then(function(querySnapshot) {
              // change this to a map and setItems should work
              setCollections( 
                querySnapshot.docs.map(item => ({
                  id: item.id,
                  name: item.data().name
                }))
              )
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            console.log("user is null. Not filling in dropdown")
        }
      }, [user]
    );

    const menuClick = (collection) => {
        console.log("clicked", collection)
        // setCurrentCollection(collection)
    }


    function CollectionsList(collections) {
        const context = useContext(Context)
        if (!Array.isArray(collections.collections)) {
            return(<div />);
        }
        
        const items = collections.collections.map((collection) => 
            <NavDropdown.Item key={collection.id} onClick={(e) => context.setCollection(collection, e)}>{collection.name}</NavDropdown.Item>
        );
        return (
            <div>{items}</div>
        );
        
    }

    return (
        <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="#home">Collections Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <ThemeContextConsumer>
                    {context =>
                <NavDropdown title={context.collection.name} id="basic-nav-dropdown">
                  <CollectionsList collections={collections} />  
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Create New Collection ...</NavDropdown.Item>
                  <NavDropdown.Item href="/manageCollections">Manage Collections...</NavDropdown.Item>
                 </NavDropdown>
                 }
                 </ThemeContextConsumer>
                <Nav.Link href="/newWork">Add Another...</Nav.Link>
                <Nav.Link href="/rateMine">Rate Mine</Nav.Link>
            </Nav>
            <AuthButton/>
        </Navbar.Collapse>
      </Navbar>
    )
}

