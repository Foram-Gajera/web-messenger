import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/HomePage/Home";
import Login from "./containers/LoginPage/Login";
import Register from "./containers/RegisterPage/Register";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser } from "./actions/Auth";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* only logged in users can see */}
          <PrivateRoute path="/" exact component={Home} />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
