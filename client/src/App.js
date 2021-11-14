import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import AddDonor from './pages/agent/AddDonor';
import AgentHome from './pages/agent/Home';
import Transaction from './pages/agent/Transaction';
import AddTransaction from './pages/agent/AddTransaction';
import Login from './pages/Login';
import AgentList from './pages/admin/AgentList';
import TransactionList from './pages/admin/Admin.Transaction';

function App() {
	axios.defaults.baseURL = 'http://localhost:5001/api';
	// axios.defaults.withCredentials = true;
	return (
		<div>
			<header>
				<Router>
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
							<Route exact path="/login">
								<Login />
							</Route>
							<Route exact path="/agent/home">
								<AgentHome />
							</Route>
							<Route exact path="/agent/add-donor">
								<AddDonor />
							</Route>
							<Route exact path="/agent/transaction">
								<Transaction />
							</Route>
							<Route exact path="/agent/add-transaction/:donorId">
								<AddTransaction />
							</Route>
							<Route exact path="/admin/agent">
								<AgentList />
							</Route>
							<Route exact path="/admin/transaction">
								<TransactionList />
							</Route>
							<Route exact path="/">
								<AgentHome />
							</Route>
						</Switch>
					</div>
				</Router>
			</header>
		</div>
	);
}

export default App;
