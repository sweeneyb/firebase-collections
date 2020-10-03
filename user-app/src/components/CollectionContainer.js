import React, {useEffect, useState, useContext} from 'react';
import {ItemBasicsCard} from './ItemBasicsCard'
import "firebase/firestore";
import firebase from "firebase/app";
import "firebase/storage"
import { Context, ThemeContextProvider, ThemeContextConsumer} from './CurrentCollection';
import {MultiCardComponent} from './MultiCardComponent'
import { ContextPrinter } from './ContextPrinter';


export function CollectionContainer(props) {
  const {userId} = props;
  const [items, setItems] = useState([]);

  let collection = useContext(Context).collection
  // console.log("context", collection)
  let childrenWithProps = React.Children.map( props.children, function(child) {
    if (React.isValidElement(child)){
        console.log("cloning")
        return React.cloneElement(child, {...props, collection});
    }
      return child;
  });

  return (
    
     <div className="d-flex flex-wrap justify-content-center">
                <ThemeContextConsumer>
                     { context =>
                    <div>
                      { childrenWithProps }
                    </div>
                     }
                 </ThemeContextConsumer>
     </div>
  );
}



