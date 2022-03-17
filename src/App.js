import "./styles/App.css";
import React from "react";
import Clientcreate from "./pages/clientcreate";
import Icons from "./icons";

export default class App extends React.Component {
  constructor() {
    Icons();
    super();
  }

  render() {
    return <Clientcreate />;
  }
}
