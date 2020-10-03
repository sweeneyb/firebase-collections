import React, { useEffect, useState } from 'react';
import {Button, Image} from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/storage"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import StarRatingComponent from 'react-star-rating-component';


const storage = firebase.storage();

export function RatingCard(props) {
//   const {work} = props.data
  const {ratingFunction, workData} = props
  const [imgSrc, setImgSrc] = useState('imgsrc');
  const [rating, setRating] = useState(0);

  const work_name = "work name";
  const artist_name = "artist name";
  const description = "desc";

  // console.log("props", workData)

  const starWasRated = (value) => {
    console.log("click rated: ", value)
  }

  useEffect(() => {
    storage.ref().child(workData.filename).getDownloadURL().then((url) => {
      console.log(url) 
      setImgSrc(url)
      setRating(workData.rating)
     
    }
    )}, [props]
  )
  
  return (
    <div className="card h-100">
      <h3 className="card-header">{workData.work_name}</h3>
      <div className="card-body">
        <Image variant="top" src={imgSrc} style={{height: 200}} />
        {/* <Image variant="top" src="" style={{height: 200}} /> */}
        <p>Artist: {workData.artist_name}</p>
        <p>{workData.description}</p>
      </div>
      <div className="card-footer">
      <StarRatingComponent
    name="Rating" /* name of the radio input, it is required */
    // value={workData.rating} /* number of selected icon (`0` - none, `1` - first) */
    value={rating}
    onStarClick={(value) => {
      setRating(value)
      ratingFunction(value)
      }
    } /* on icon click handler */
    // onStarHover={Function(nextValue, prevValue, name)} /* on icon hover handler */
    // onStarHoverOut={Function(nextValue, prevValue, name)} /* on icon hover out handler */
    // renderStarIcon={Function(nextValue, prevValue, name)} /* it should return string or react component */
    renderStarIcon={(index, value) => {
        return index <= value ? 
        <FontAwesomeIcon icon={faStarSolid} /> :
        <FontAwesomeIcon icon={faStar} /> 
        
        }
    }
    // renderStarIconHalf={Function(nextValue, prevValue, name)} /* it should return string or react component */
    // starColor={String} /* color of selected icons, default `#ffb400` */
    // emptyStarColor={String} /* color of non-selected icons, default `#333` */
    editing={true} /* is component available for editing, default `true` */
/>
      </div>
    </div>
  );
}

