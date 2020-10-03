import React, { useEffect, useState } from 'react';
import {Button, Image} from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/storage"

const storage = firebase.storage();

function ItemBasicsCard(props) {
  const {work_name, artist_name, description, filename} = props.data
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    storage.ref().child(filename).getDownloadURL().then((url) => {
      console.log(url) 
      setImgSrc(url)
     
    }
    )}, [filename]
  )
  
  return (
    <div className="card h-100">
      <h3 className="card-header">{work_name}</h3>
      <div className="card-body">
        <Image variant="top" src={imgSrc} style={{height: 200}} />
        {/* <Image variant="top" src="" style={{height: 200}} /> */}
        <p>Artist: {artist_name}</p>
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <Button variant="btn btn-primary">View Details</Button>
      </div>
    </div>
  );
}

export {ItemBasicsCard};
