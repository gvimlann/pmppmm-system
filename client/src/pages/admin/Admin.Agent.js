import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminRoute from '../../components/Admin.Route';
import AdminAgentTable from '../../components/admin/Admin.AgentTable';
import AdminAgentPopupModal from '../../components/admin/Admin.AgentPopupModal';

function AdminAgent() {
	const [agentList, setAgentList] = useState([]);
	const fetchAgents = async () => {
		try {
			const { data } = await axios.get('/agent/get');
			setAgentList(data.allAgents);
			// console.log(data.allAgents);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchAgents();
	}, []);

	const openEditModal = async (id) => {
		console.log('Modal opened');
		setOpenModal(true);
		const selectedAgent = agentList.find((item) => {
			return item.id === id;
		});

		setFormData(selectedAgent);
	};

	const agentApproved = async (id) => {
		const selectedAgent = agentList.find((item) => {
			return item.id === id;
		});
		// console.log(selectedAgent);
		try {
			const { data } = await axios.post('/agent/approve', {
				id: selectedAgent.id,
				email: selectedAgent.email,
				approved: true,
			});
			console.log(data);
			fetchAgents();
		} catch (err) {
			console.log(err);
			alert(err.response.data.message);
		}
	};

	const agentRejected = async (id) => {
		console.log('Transaction rejected: ', id);
		const selectedAgent = agentList.find((item) => {
			return item.id === id;
		});

		try {
			const { data } = await axios.post('/agent/update', formData);
			console.log(data);
			fetchAgents();
		} catch (err) {
			console.log(err);
		}
	};

	const successHandle = async () => {
		setOpenModal(false);
	};

	const cancelHandle = () => {
		setOpenModal(false);
	};

	const handleChange = (e) => {
		// console.log("handleChange", e);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const formSubmitHandle = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/agent/update', formData);
			fetchAgents();
		} catch (err) {
			console.log(err);
		}
	};
	const [formData, setFormData] = useState({
		id: undefined,
		email: undefined,
		fullName: undefined,
		contactNumber: undefined,
		icNumber: undefined,
		username: undefined,
		status: undefined,
		approved: undefined,
	});
	const setDate = (e) => {
		setFormData({ ...formData, quotationDate: e });
	};

	const [openModal, setOpenModal] = useState(false);

	return (
		<AdminRoute>
			{/* <div>Agent List</div> */}
			{/* <pre>{JSON.stringify(agentList, null, 4)}</pre> */}
			<AdminAgentTable
				agentList={agentList}
				openEditModal={openEditModal}
				agentApproved={agentApproved}
				agentRejected={agentRejected}
			/>
			<AdminAgentPopupModal
				title="Edit"
				content="Edit Data"
				successText="Submit"
				cancelText="Cancel"
				successHandle={successHandle}
				cancelHandle={cancelHandle}
				openModal={openModal}
				handleChange={handleChange}
				formSubmitHandle={formSubmitHandle}
				formData={formData}
				setDate={setDate}
			/>
		</AdminRoute>
	);
}

export default AdminAgent;
