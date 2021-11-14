import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AgentLayout from '../../components/AgentLayout';
import DonorTable from '../../components/DonorTable';
function AgentHome() {
	const [donorsList, setDonorsList] = useState([]);
	useEffect(() => {
		const fetchDonors = async () => {
			try {
				const { data } = await axios.post('/donor/get', { agentId: 1 });
				console.log(data.allDonors);
				setDonorsList(data.allDonors);
			} catch (err) {
				console.log(err);
			}
		};
		fetchDonors();
	}, []);

	return (
		<div>
			<AgentLayout>
				<div className="px-4 py-3 text-right sm:px-6">
					<Link to="/agent/add-donor">
						<button
							type="button"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Add Donor
						</button>
					</Link>
				</div>
				<DonorTable donorsList={donorsList} />
			</AgentLayout>
		</div>
	);
}

export default AgentHome;
