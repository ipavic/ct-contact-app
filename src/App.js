import { useState, StrictMode, createContext, useContext } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import "./App.css";

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      <button
        className="btn btn-danger"
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p className="h5 mb-4">You must Log-in to view this page!</p>
      <button className="btn btn-danger" onClick={login}>
        Log in
      </button>
    </div>
  );
}

const App = () => {
  
  return (
    <ProvideAuth>
      <div>
        <Router>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <nav>
                  <ul>
                    <li>
                      <Link to={"/"}>Dashboard</Link>
                    </li>
                    <li>
                      <Link to={"/add"}>Add New Contact</Link>
                    </li>
                    <li>
                      <AuthButton />
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-8">
                <Switch>
                  <Route exact path="/login">
                    <LoginPage />
                  </Route>
                  <PrivateRoute exact path="/edit/:id">
                    <EditContact />
                  </PrivateRoute>
                  <PrivateRoute exact path="/add">
                    <AddContact />
                  </PrivateRoute>
                  <PrivateRoute exact path="/">
                    <Dashboard />
                  </PrivateRoute>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    </ProvideAuth>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
