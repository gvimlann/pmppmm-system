import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AgentRoute from "../../components/Agent.Route";
import TransactionTable from "../../components/agent/TransactionTable";

function Transaction() {
  const [transactionList, setTransactionList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.post("/transaction/get", { agentId: 1 });
        setTransactionList(data.allTransactions);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactions();
  }, []);

  // useEffect(() => {
  // 	console.log(selectedFile);
  // }, [selectedFile]);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();

    // // Update the formData object
    formData.append("file", selectedFile);

    // Request made to the backend api
    // Send formData object
    axios
      .post("/transaction/upload-form", formData, {
        onUploadProgress: (p) => {
          const percentCompleted = Math.round((p.loaded / p.total) * 100);
          setFileUpload({ fileName: selectedFile.name, percentCompleted });
          console.log(`${percentCompleted}% uploaded`);
        },
      })
      .then((res) => {
        console.log("completed");
        console.log(res);
      });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <AgentRoute>
      <div className="px-4 py-3 text-right sm:px-6"></div>
      <TransactionTable transactionList={transactionList} />
      {/* <input type="file" onChange={onFileChange} />
			<button className="bg-gray-300 p-5" onClick={onFileUpload}>
				Upload!
			</button>
			{fileData()}
			<pre>{JSON.stringify(fileUpload, null, 4)}</pre> */}
    </AgentRoute>
  );
}

export default Transaction;
