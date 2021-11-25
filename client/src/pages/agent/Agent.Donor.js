import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AgentRoute from "../../components/Agent.Route";
import AgentDonorTable from "../../components/agent/Agent.DonorTable";
import { Context } from "../../context";

function Donor() {
  const { state } = useContext(Context);
  const [donorsList, setDonorsList] = useState([]);
  const [error, setError] = useState("");

  const fetchDonors = async () => {
    try {
      const { data } = await axios.post("/donor/get");
      // console.log(data.allDonors);
      setDonorsList(data.allDonors);
    } catch (err) {
      console.log(err.response.status);
    }
  };

  const updateUI = () => {
    if (state.user && state.user.status === "SUSPENDED") {
      setError(
        "Your account has been suspended. Please contact admin to resolve it."
      );
    } else {
      setError("");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    updateUI();
  }, [state, error]);

  return (
    <div>
      <AgentRoute>
        <div
          className={`px-4 py-3 text-right sm:px-6 ${
            error.length > 0 && "is-disabled"
          }`}
        >
          {error !== "" && (
            <div className='mb-6 px-4 py-2 text-left  bg-red-200 rounded-md text-sm font-semibold'>
              {error}
            </div>
          )}
          <Link to='/agent/add-donor'>
            <button
              type='button'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Add Donor
            </button>
          </Link>
        </div>
        <AgentDonorTable disabled={error.length > 0} donorsList={donorsList} />
      </AgentRoute>
    </div>
  );
}

export default Donor;
