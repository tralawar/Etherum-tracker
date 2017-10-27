import React, { Component } from "react";
import logo from "./logo-light.png";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { getMuiTheme } from "material-ui/styles";
import injectTapEventPlugin from "react-tap-event-plugin";
import {
  deepPurple200,
  deepPurple100,
  deepPurple300
} from "material-ui/styles/colors";

injectTapEventPlugin();

const muiTheme = getMuiTheme(
  {
    palette: {
      primary1Color: deepPurple300,
      primary2Color: deepPurple200,
      primary3Color: deepPurple100
    }
  },
  {
    avatar: {
      borderColor: null
    }
  }
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header id="header" className="App-header">
          <div className="stars" />
          <div className="rotate">
            <div className="meteor" />
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Starbase</h1>
          <p>Enter an Etherum address below to track incoming deposits</p>
        </header>
        <MuiThemeProvider muiTheme={muiTheme}>
          <HomePage onSubmit={this.submit} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
