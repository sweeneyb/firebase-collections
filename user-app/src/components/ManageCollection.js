import React, {useEffect, useState} from 'react';
import {ItemBasicsCard} from './ItemBasicsCard'
import firebase from "firebase/app";
import "firebase/database"
import "firebase/storage"
import { Context, ThemeContextProvider, ThemeContextConsumer} from './CurrentCollection';
import { useUser} from './AuthButton'
import {Button, Modal, Row} from 'react-bootstrap'


const firestore = firebase.firestore();
const db = firebase.database();

export function ManageCollection(props) {
    const user = useUser();
    const [collections, setCollections] = useState([]);
    const [show, setShow] = useState(false);
    const [shareId, setShareId] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (collection) => {
        console.log("modal id: ", collection)
        var collectionRef = firestore.collection("users/"+user.uid+"/collections").doc(collection);
        // var dbref = db.ref("users/"+user.uid+"/collections/"+collection);
        // console.log(dbref)
        // var ref = dbref.child("/sharingKeys").push({data: "some data"})
        collectionRef.get().then( item => {
            var doc = item.data()
            if(doc.sharingLinks == undefined) {
                doc.sharingLinks = []
            }
            // XXX should be a server-side generated GUID
            doc.sharingLinks.push(new Date().getTime())
            collectionRef.set(doc)
        }
        )
        // console.log("new id: ",ref.id)
        // setShareId(ref.id)
        setShow(true);
    }
    
    useEffect(() => {
        if(user) {
            firestore.collection("users/"+user.uid+"/collections").get()
            .then(function(querySnapshot) {
                console.log("getting collections")
              // change this to a map and setItems should work
              querySnapshot.forEach( (item) => {console.log(item)})
              setCollections( 
                querySnapshot.docs.map(item => {
                    return ({
                        id: item.id,
                        data: item.data()
                    }
                )})
              )
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            console.log("user is null. Not filling in dropdown")
        }
      }, [user]
    );


  return (
      <>
     <div className="d-flex flex-wrap justify-content-center flex-column">
      {collections.map(item =>
          <div key={item.id} className="mt-5 mr-5 d-flex flex-column">
              <Row className="d-flex">
               <h2>{item.data.name}</h2><Button className="ml-5" onClick={() => {handleShow(item.id)}}>Create Sharing Link...</Button>
               </Row>
               {item.data.sharingLinks && item.data.sharingLinks.map( link => 
                <Row className="ml-10"><ul>{ link }</ul></Row>

                )}
          </div>
      )}      
      </div>   
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sharing link created!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Share this link to let somebody else rate your art!<br/><br/>{shareId}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
     
  );
}



