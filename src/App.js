import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import MapContainer from "./components/MapContainer";
import { Container } from "@material-ui/core";
import './App.css'
function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
         <img src={`google-maps-icon.png`} className="App-logo" alt="logo" />
        <MapContainer />
      </Container>
    </Provider>
  );
}

export default App;
