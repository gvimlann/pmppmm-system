import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';

function TransactionList() {
	const [agentList, setAgentList] = useState([]);
	useEffect(() => {
		const fetchAgents = async () => {
			try {
				const { data } = await axios.get('/agent/get');
				setAgentList(data.allAgents);
				console.log(data.allAgents);
			} catch (err) {
				console.log(err);
			}
		};
		fetchAgents();
	}, []);

	return (
		<AdminLayout>
			<div>Agent List</div>
			<pre>{JSON.stringify(agentList, null, 4)}</pre>
		</AdminLayout>
	);
}

export default TransactionList;
