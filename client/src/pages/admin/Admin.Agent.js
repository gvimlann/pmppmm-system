import { useEffect, useState } from "react";
import axios from "axios";
import AdminRoute from "../../components/Admin.Route";
import AdminAgentTable from "../../components/agent/Admin.AgentTable";

function AdminAgent() {
  const [agentList, setAgentList] = useState([]);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data } = await axios.get("/agent/get");
        setAgentList(data.allAgents);
        console.log(data.allAgents);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAgents();
  }, []);

  return (
    <AdminRoute>
      <div>Agent List</div>
      <pre>{JSON.stringify(agentList, null, 4)}</pre>
      <AdminAgentTable agentList={agentList} />
    </AdminRoute>
  );
}

export default AdminAgent;
