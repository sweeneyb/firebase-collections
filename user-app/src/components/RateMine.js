import React from 'react';
import uuid from 'react-uuid';
import "firebase/firestore";
import firebase from "firebase/app";
import {useUser} from "./AuthButton";
import { Form,  FormControl, Button, InputGroup} from 'react-bootstrap';
import "firebase/storage"

const firestore = firebase.firestore();
const storage = firebase.storage();

export function RateMine() {
  const user = useUser();

  function add(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        work_name: form.elements.workName.value,
        artist_name: form.elements.artistName.value,
        value: form.elements.value.value,
        description: form.elements.description.value,
        filename: user.uid+"/"+uuid()
    }
    // const name = form.elements.name.value;
    console.log("workEntry photo file", form.elements.photo.files[0])
    
    storage.ref().child(data.filename).put(form.elements.photo.files[0]).then(
      firestore.collection('users').doc(user.uid).collection("works").add(data)
    )
    form.reset();
  }

  return (

    <Form onSubmit={add}>
    <Form.Group controlId="formGroupEmail">
      <Form.Label>Work name</Form.Label>
      <Form.Control type="input" placeholder="Work Name" name="workName" />
    </Form.Group>
    <Form.Group controlId="formGroupPassword">
      <Form.Label>Artist</Form.Label>
      <Form.Control type="input" placeholder="Artist" name="artistName"/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Value</Form.Label>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup.Prepend>
  
      <FormControl aria-label="Value (to the nearest dollar)" name="value" />
      <InputGroup.Append>
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Work Description  </Form.Label>
      <Form.Control as="textarea" rows="3" name="description" />
    </Form.Group>
    <Form.File id="photo" name="photo"/>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  );
}

export default RateMine;
