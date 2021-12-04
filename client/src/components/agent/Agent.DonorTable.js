import { Link } from 'react-router-dom';
import moment from 'moment';

export default function AgentDonorTable({ donorsList, disabled }) {
	var dateOffset = 24 * 60 * 60 * 1000 * 14;
	// var myDate = new Date();
	var todayDate = new Date();
	// myDate.setTime(myDate.getTime() - dateOffset);

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
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Contact Number
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Address
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Expiry Date
									</th>
									{/* <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th> */}
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Action
									</th>
									{/* <th scope="col" className="relative px-6 py-3">
										<span className="sr-only">Edit</span>
									</th> */}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{donorsList.map((donor, idx) => (
									<tr
										key={donor.id}
										className={`${
											new Date(donor.expiryDate) - todayDate < 0 && `bg-red-100`
										} ${
											new Date(donor.expiryDate) - todayDate < dateOffset &&
											new Date(donor.expiryDate) - todayDate > 0 &&
											`bg-yellow-100`
										}`}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{idx + 1}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{donor.name}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.contactNumber}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.address}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{moment(donor.expiryDate).format('DD/MM/YYYY')}
											</div>
										</td>
										{/* <td className='px-6 py-4 whitespace-nowrap'>
                      {donor.status === "APPROVED" && (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          {donor.status}
                        </span>
                      )}{" "}
                      {donor.status === "EXPIRED" && (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                          {donor.status}
                        </span>
                      )}
                      {donor.status !== "APPROVED" &&
                        donor.status !== "EXPIRED" && (
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
                            {donor.status}
                          </span>
                        )}
                    </td> */}
										{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{donor.status}
										</td> */}
										{/* {donor.status === "APPROVED" && ( */}
										<td className="px-4 py-2 whitespace-nowrap text-sm font-medium flex">
											{!disabled && (
												<Link to={`/agent/add-transaction/${donor.id}`}>
													<button className="p-2 bg-indigo-100 text-indigo-600 font-semibold hover:text-indigo-900 hover:bg-indigo-200 rounded-md">
														Add Transaction
													</button>
												</Link>
											)}
											{!disabled &&
												new Date(donor.expiryDate) - todayDate < dateOffset && (
													<button
														onClick={() => alert('Donor Expiry Date Extended')}
														className="p-2 bg-indigo-100 text-indigo-600 font-semibold hover:text-indigo-900 ml-2 hover:bg-indigo-200 rounded-md">
														Extend Expiry Date
													</button>
												)}
										</td>
										{/* )} */}
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
