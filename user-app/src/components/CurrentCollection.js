import React, { Component } from "react";
const Context = React.createContext();
const { Provider, Consumer } = Context;

/*
For when I eventually want to convert this to a functional component
https://codesandbox.io/s/bold-feistel-bj38w
*/

class ThemeContextProvider extends Component {
  state = {
    collection: {id: undefined, name: "Choose Collection..."}
  };

  setCollection = (collection) => {
    this.setState(prevState => {
      return {
        collection: collection
      };
    });
  };

  render() {
    return (
      <Provider
        value={{ collection: this.state.collection, setCollection: this.setCollection }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Context, ThemeContextProvider, Consumer as ThemeContextConsumer };
