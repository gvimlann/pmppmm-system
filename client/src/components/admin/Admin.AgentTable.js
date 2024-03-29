export default function AdminAgentTable({
  agentList,
  openEditModal,
  agentApproved,
  agentRejected,
}) {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    No
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Agent Name
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    IC Number
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Contact Number
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Approved
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {agentList.map((agent, idx) => (
                  <tr key={agent.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{idx + 1}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {agent.fullName}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {agent.icNumber}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {agent.contactNumber}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {agent.status}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {agent.approved.toString() === "true" ? "YES" : "NO"}
                      </div>
                    </td>
                    {!agent.approved ? (
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer'>
                        <div className='flex space-x-2'>
                          <button
                            onClick={() => agentApproved(agent.id)}
                            className='bg-green-50 p-2 text-xs text-green-600 hover:bg-green-100 rounded-md'
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => agentRejected(agent.id)}
                            className='bg-red-50 p-2 text-xs text-red-600 hover:bg-red-100 rounded-md'
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    ) : (
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer'>
                        <button
                          onClick={() => openEditModal(agent.id)}
                          className='bg-indigo-50 p-2 text-xs text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100  rounded-md'
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
