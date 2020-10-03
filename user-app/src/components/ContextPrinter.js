import React, {useState, useEffect} from 'react';
import firebase from "firebase/app";
import {RatingCard} from './RatingCard'
import { generatePath } from 'react-router-dom';
const firestore = firebase.firestore();

export const ContextPrinter = (props) =>  {
    const {userId, collection} = props;
    const [toDisplay, setToDisplay] = useState([])
    const [index, setIndex] = useState(0)
    
    useEffect(() => {
        console.log("collection" , collection.id)
        if ( collection.id != undefined ) {
          var docRef = firestore.collection("users/"+userId+"/collections/").doc(collection.id);
          docRef.get().then(function(doc){
            if (doc.exists) {
              var paths = doc.data().paths
              console.log("paths", paths)
    
              var worksRef = firestore.collection("users/"+userId+"/works");
              worksRef.where(firebase.firestore.FieldPath.documentId(), "in", paths).get().then( query => {
                
              setToDisplay (
                query.docs.map(item => ({
                  id: item.id,
                  data: item.data()
                }))
              )
              }
              )
          } else {
              console.log("No such document!");
          }
          }).catch(function(error) {
            console.log("Error getting document:", error);
        });
          
        }
        setIndex(0)
      }, [collection])


    const getWork = (index) => {
        console.log("TD: ", toDisplay)
        if( toDisplay.length == 0) {
            return {
                work_name: "Loading...",
                artist_name: "Loading...",
                description: "Loading...",
                filename: "none",
                value: "0"
            }
        }
        let work = toDisplay[index];
        console.log("returning work" , work)
        if (work.data.rating == undefined ) {
          work.data.rating = 0;
        }
        // return workDetails[index]
        return work.data;
        // return {
            
        //     work_name: "hardcoded name"
        // }
    }

    const rateFunction = (value) => {
      console.log("rated: ", toDisplay[index].id, " as ", value);
      toDisplay[index].data.rating = value;
      var workRef = firestore.collection("users/"+userId+"/works").doc(toDisplay[index].id);
      workRef.update({
        rating: value
      })
      .then(function() {
        console.log(toDisplay[index].id, "updated with a rating of ", value);
      })
      .catch( function() {
        console.log("couldn't update ", toDisplay[index].id)
      })
      const newindex = (index+1) % toDisplay.length;
      console.log( 'new index', newindex)
        setTimeout( function () {
          setIndex(newindex)
        }, 500)
        
    }

    return (        
        <div>
            <h2>{ collection.name}</h2>
    { collection.id == undefined  || <RatingCard ratingFunction={rateFunction} workData={getWork(index)}></RatingCard> }
        </div>
    )
}
