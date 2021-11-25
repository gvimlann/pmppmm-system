import { useEffect, useState } from "react";
import axios from "axios";
import AdminRoute from "../../components/Admin.Route";
import AdminAgentTable from "../../components/admin/Admin.AgentTable";
import AdminDonorTable from "../../components/admin/Admin.DonorTable";

function AdminDonor() {
  const [donorList, setDonorList] = useState([]);
  const fetchDonors = async () => {
    try {
      const { data } = await axios.get("/donor/admin/get");
      console.log(data);
      setDonorList(data.allDonors);
      // console.log(data.allAgents);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDonors();
  }, []);

  const openEditModal = async (id) => {
    console.log("Modal opened");
    setOpenModal(true);
    const selectedAgent = donorList.find((item) => {
      return item.id === id;
    });

    setFormData(selectedAgent);
  };

  const agentApproved = async (id) => {
    const selectedAgent = donorList.find((item) => {
      return item.id === id;
    });
    // console.log(selectedAgent);
    try {
      const { data } = await axios.post("/agent/approve", {
        id: selectedAgent.id,
        approved: true,
      });
      console.log(data);
      fetchDonors();
    } catch (err) {
      console.log(err);
    }
  };

  const agentRejected = async (id) => {
    console.log("Transaction rejected: ", id);
    const selectedDonor = donorList.find((item) => {
      return item.id === id;
    });

    try {
      const { data } = await axios.post("/agent/update", formData);
      console.log(data);
      fetchDonors();
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
      await axios.post("/agent/update", formData);
      fetchDonors();
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
      <AdminDonorTable
        donorList={donorList}
        openEditModal={openEditModal}
        agentApproved={agentApproved}
        agentRejected={agentRejected}
      />
    </AdminRoute>
  );
}

export default AdminDonor;
