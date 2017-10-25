import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MuiThemeProvider>
          <HomePage onMessage={JSON.stringify({ event: "ping" })} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
