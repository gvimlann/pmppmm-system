import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AgentRoute from '../../components/Agent.Route';
import AgentDonorTable from '../../components/agent/Agent.DonorTable';
function Donor() {
	const [donorsList, setDonorsList] = useState([]);
	useEffect(() => {
		const fetchDonors = async () => {
			try {
				const { data } = await axios.post('/donor/get', { agentId: 1 });
				// console.log(data.allDonors);
				setDonorsList(data.allDonors);
			} catch (err) {
				console.log(err);
			}
		};
		const login = async () => {
			try {
				const { data } = await axios.post('/auth/login');
				console.log('login');
				console.log(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchDonors();
		// login();
	}, []);

	return (
		<div>
			<AgentRoute>
				<div className="px-4 py-3 text-right sm:px-6">
					<Link to="/agent/add-donor">
						<button
							type="button"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Add Donor
						</button>
					</Link>
				</div>
				<AgentDonorTable donorsList={donorsList} />
			</AgentRoute>
		</div>
	);
}

export default Donor;
