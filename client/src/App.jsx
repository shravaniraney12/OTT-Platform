import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register"
import Login from "./pages/login/Login";
import "./app.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../client/src/authContext/AuthContext";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {user? <Home />: <Redirect to="register"/>}
          </Route>
          <Route exact path="/register">
            {!user? <Register />: <Redirect to="/"/>}
          </Route>
          <Route exact path="/login">
            {!user? <Login />: <Redirect to="/"/>}
          </Route>
          {user && (
              <>
                <Route path="/movies">
                  <Home type="movies"/>
                </Route>
                <Route path="/series">
                  <Home type="series"/>
                </Route>
                <Route path="/watch">
                  <Watch/>
                </Route>
              </>
            )
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
