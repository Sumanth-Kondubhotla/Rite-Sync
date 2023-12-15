import React from "react";
import "./App.css";
import Button from "./Shared-Components/Button/Button";

function App() {
  return (
    <div className="App">
      <Button $primary onClick={() => console.log("something")}>
        Styled-Component Button
      </Button>
    </div>
  );
}

export default App;
