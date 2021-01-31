import React from "react";
import "./App.css";
import Unsubscribe from "./components/unsubscribe";
import Login from "./components/login";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <div
        // style={{
        //     maxWidth: "64rem",
        //     margin: "0px auto",
        // }}
        >
            <Router>
                <Route exact path="/" component={Login} />
                <Route exact path="/unsubscribe" component={Unsubscribe} />
            </Router>
        </div>
    );
}

export default App;
