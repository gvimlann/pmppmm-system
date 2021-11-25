import { useEffect, useState } from "react";
import axios from "axios";
import AdminRoute from "../../components/Admin.Route";
import AdminTransactionTable from "../../components/admin/Admin.TransactionTable";
import AdminTransactionPopupModal from "../../components/admin/Admin.TransactionPopupModal";

export default function AdminTransaction() {
  const [transactionList, setTransactionList] = useState([]);
  // const [selectedTransaction, setSelectedTransaction] = useState({});

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("/transaction/admin/get");
      setTransactionList(data.allTransactions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const openEditModal = async (id) => {
    console.log("Modal opened");
    setOpenModal(true);
    const selectedTransaction = transactionList.find((item) => {
      return item.id === id;
    });

    // console.log(selectedTransaction);
    // setSelectedTransaction(selectedTransaction);
    setFormData(selectedTransaction);
  };

  const transactionApproved = async (id) => {
    console.log("Transaction approved: ", id);
    const selectedTransaction = transactionList.find((item) => {
      return item.id === id;
    });
    try {
      const { data } = await axios.post("/transaction/admin/update", {
        id: selectedTransaction.id,
        status: "APPROVED",
      });
      console.log(data);
      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  const transactionRejected = async (id) => {
    console.log("Transaction rejected: ", id);
    const selectedTransaction = transactionList.find((item) => {
      return item.id === id;
    });

    try {
      const { data } = await axios.post("/transaction/admin/update", {
        id: selectedTransaction.id,
        status: "REJECTED",
      });
      console.log(data);
      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  const successHandle = async () => {
    // console.log('Success');
    try {
      await axios.post("/transaction/admin/update", formData);
      // console.log(data);
      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
    setOpenModal(false);
  };

  const cancelHandle = () => {
    // console.log('Cancel');
    setOpenModal(false);
  };

  const handleChange = (e) => {
    // console.log("handleChange", e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    // console.log("formSubmitHandle");
    // console.log(selectedTransaction);
    // console.log(formData);
    try {
      await axios.post("/transaction/admin/update", {
        formData,
      });
      fetchTransactions();
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
    <AdminRoute>
      {/* <pre>{JSON.stringify(transactionList, null, 4)}</pre> */}
      <AdminTransactionTable
        transactionList={transactionList}
        openEditModal={openEditModal}
        transactionApproved={transactionApproved}
        transactionRejected={transactionRejected}
      />
      <AdminTransactionPopupModal
        title='Edit'
        content='Edit Data'
        successText='Submit'
        cancelText='Cancel'
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
