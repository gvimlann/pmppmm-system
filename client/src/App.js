import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import AgentAddDonor from "./pages/agent/Agent.AddDonor";
import AgentDonor from "./pages/agent/Agent.Donor";
import AgentTransaction from "./pages/agent/Agent.Transaction";
import AgentAddTransaction from "./pages/agent/Agent.AddTransaction";
import Login from "./pages/Login";
import AdminAgent from "./pages/admin/Admin.Agent";
import AdminTransaction from "./pages/admin/Admin.Transaction";
import { Provider } from "./context";
import AdminDonor from "./pages/admin/Admin.Donor";

function App() {
  // axios.defaults.baseURL = "http://localhost:5001/api";
  axios.defaults.baseURL = "/api";
  // axios.defaults.withCredentials = true;

  return (
    <div>
      <header>
        <Router>
          <Provider>
            <div>
              {/*<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/about">About</Link>
								</li>
								<li>
									<Link to="/users">Users</Link>
								</li>
							</ul>
						</nav> */}

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route exact path='/'>
                  <Login />
                </Route>
                <Route exact path='/agent/donor'>
                  <AgentDonor />
                </Route>
                <Route exact path='/agent/add-donor'>
                  <AgentAddDonor />
                </Route>
                <Route exact path='/agent/transaction'>
                  <AgentTransaction />
                </Route>
                <Route exact path='/agent/add-transaction/:donorId'>
                  <AgentAddTransaction />
                </Route>
                <Route exact path='/admin/agent'>
                  <AdminAgent />
                </Route>
                <Route exact path='/admin/donor'>
                  <AdminDonor />
                </Route>
                <Route exact path='/admin/transaction'>
                  <AdminTransaction />
                </Route>
              </Switch>
            </div>
          </Provider>
        </Router>
      </header>
    </div>
  );
}

export default App;
