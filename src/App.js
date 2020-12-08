import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/HomePage/Home";
import Login from "./containers/LoginPage/Login";
import Register from "./containers/RegisterPage/Register";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
