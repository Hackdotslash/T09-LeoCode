import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Inbox from "./components/inbox";
import "./App.css";
import Header from "./components/header";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <div className="App wrapper container-fluid">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/go" component={Inbox}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
