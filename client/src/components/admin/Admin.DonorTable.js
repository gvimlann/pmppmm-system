export default function AdminDonorTable({
	donorList,
	openEditModal,
	agentApproved,
	agentRejected,
}) {
	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										No
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Agent Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Donor Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										IC Number / Reg Number
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Contact Person
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Contact Number
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Edit
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{donorList.map((donor, idx) => (
									<tr key={donor.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{idx + 1}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.agent.fullName}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{donor.name}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.icNumber || donor.registrationNo}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.contactPerson}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.contactNumber}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.status}
											</div>
										</td>
										{/*
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {donor.approved.toString() === "true" ? "YES" : "NO"}
                      </div>
                    </td>
                    {!donor.approved ? (
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer'>
                        <div className='flex space-x-2'>
                          <button
                            onClick={() => agentApproved(donor.id)}
                            className='bg-green-50 p-2 text-xs text-green-600 hover:bg-green-100 rounded-md'
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => agentRejected(donor.id)}
                            className='bg-red-50 p-2 text-xs text-red-600 hover:bg-red-100 rounded-md'
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    ) : (
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer'>
                        <button
                          onClick={() => openEditModal(donor.id)}
                          className='bg-indigo-50 p-2 text-xs text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100  rounded-md'
                        >
                          Edit
                        </button>
                      </td>
                    )} */}
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
