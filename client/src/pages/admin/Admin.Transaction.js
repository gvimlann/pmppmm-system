import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import AdminTransactionTable from '../../components/AdminTransactionTable';
import PopupModal from '../../components/admin/PopupModal';

function TransactionList() {
	const [transactionList, setTransactionList] = useState([]);
	const [selectedTransaction, setSelectedTransaction] = useState({});
	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const { data } = await axios.get('/transaction/admin/get');
				setTransactionList(data.allTransactions);
			} catch (err) {
				console.log(err);
			}
		};
		fetchTransactions();
	}, []);

	const openEditModal = async (id) => {
		console.log('Modal opened');
		setOpenModal(true);
		const selectedTransaction = transactionList.find((item) => {
			return item.id === id;
		});

		console.log(selectedTransaction);
		setSelectedTransaction(selectedTransaction);
		setFormData(selectedTransaction);
	};

	const transactionApproved = async (id) => {
		console.log('Transaction approved: ', id);
		const selectedTransaction = transactionList.find((item) => {
			return item.id === id;
		});
		try {
			const { data } = await axios.post('/transaction/admin/update', {
				tid: selectedTransaction.id,
				status: 'APPROVED',
			});
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	const transactionRejected = async (id) => {
		console.log('Transaction rejected: ', id);
		const selectedTransaction = transactionList.find((item) => {
			return item.id === id;
		});

		try {
			const { data } = await axios.post('/transaction/admin/update', {
				tid: selectedTransaction.id,
				status: 'REJECTED',
			});
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	const successHandle = () => {
		console.log('Success');
		setOpenModal(false);
	};

	const cancelHandle = () => {
		console.log('Cancel');
		setOpenModal(false);
	};

	const handleChange = (e) => {
		console.log('handleChange', e);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const formSubmitHandle = async (e) => {
		e.preventDefault();
		console.log('formSubmitHandle');
		try {
			const { data } = await axios.post('/transaction/admin/update', {
				tid: selectedTransaction.id,
				selectedTransaction,
			});
		} catch (err) {
			console.log(err);
		}
	};
	const [formData, setFormData] = useState({
		amount: undefined,
		bankName: undefined,
		chequeDate: undefined,
		chequeNo: undefined,
		donor: { name: undefined },
		id: undefined,
		paymentType: undefined,
	});
	const setDate = (e) => {
		setFormData({ ...formData, quotationDate: e });
	};

	const [openModal, setOpenModal] = useState(false);

	return (
		<AdminLayout>
			{/* <pre>{JSON.stringify(transactionList, null, 4)}</pre> */}
			<AdminTransactionTable
				transactionList={transactionList}
				openEditModal={openEditModal}
				transactionApproved={transactionApproved}
				transactionRejected={transactionRejected}
			/>
			<PopupModal
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
		</AdminLayout>
	);
}

export default TransactionList;
