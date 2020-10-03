import React, {useEffect, useState} from 'react';
import {ItemBasicsCard} from './ItemBasicsCard'
import "firebase/firestore";
import firebase from "firebase/app";
import "firebase/storage"
import { Context, ThemeContextProvider, ThemeContextConsumer} from './CurrentCollection';


const firestore = firebase.firestore();

export function MultiCardComponent(props) {
  const {userId, collection} = props;
  const [items, setItems] = useState([]);
  const [toDisplay, setToDisplay] = useState([]);


  useEffect(() => {
    firestore.collection("users/"+userId+"/works").get()
    .then(function(querySnapshot) {
      setItems( 
        querySnapshot.docs.map(item => ({
          id: item.id,
          data: item.data()
        }))
      )
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    setToDisplay(items)
  }, [userId]
);

  useEffect(() => {
    console.log("collection" , collection.id)
    if ( collection.id != undefined ) {
      var docRef = firestore.collection("users/"+userId+"/collections/").doc(collection.id);
      docRef.get().then(function(doc){
        if (doc.exists) {
          var paths = doc.data().paths
          console.log("paths", paths)
          console.log("items", items)

          var worksRef = firestore.collection("users/"+userId+"/works");
          worksRef.where(firebase.firestore.FieldPath.documentId(), "in", paths).get().then( query => {
            query.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
          setToDisplay (
            query.docs.map(item => ({
              id: item.id,
              data: item.data()
            }))
          )
          }
           
          
          )
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      }).catch(function(error) {
        console.log("Error getting document:", error);
    });
      
    }
  }, [collection])

  return (
     <div className="d-flex flex-wrap justify-content-center">
      {toDisplay.map(item =>
          <div key={item.id} className="mt-5 mr-5">
               <ItemBasicsCard data={item.data} />
          </div>
      )}         
       
     </div>
 
  );
}

export default MultiCardComponent;


