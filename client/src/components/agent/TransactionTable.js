import moment from 'moment';
export default function TransactionTable({ transactionList }) {
	return (
		<div className="flex flex-col">
			{/* {console.log(transactionList)} */}
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
									{/* <th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Name
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
									</th> */}
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Amount
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Payment Type
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Cheque Date
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Cheque No
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Bank Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Download Doc
									</th>

									{/* <th scope="col" className="relative px-6 py-3">
										<span className="sr-only">Edit</span>
									</th> */}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{transactionList.map((transaction, idx) => (
									<tr key={transaction.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{idx + 1}</div>
										</td>
										{/* <td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{donor.name}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.address}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{donor.expiryDate}
											</div>
										</td> */}
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{transaction.donor.name}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{transaction.status === 'COMPLETED' ? (
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{transaction.status}
												</span>
											) : (
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
													{transaction.status}
												</span>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{transaction.amount}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{transaction.paymentType}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{transaction.chequeDate &&
													moment(transaction.chequeDate).format('DD/MM/YYYY')}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{transaction.chequeNo}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{transaction.bankName}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer">
											<div className="flex space-x-2">
												<a
													href={transaction.doc1Url}
													target="_blank"
													className="bg-green-50 p-2 text-xs text-green-600 hover:bg-green-100 rounded-md">
													Medical List
												</a>
												<a
													href={transaction.doc2Url}
													target="_blank"
													className="bg-red-50 p-2 text-xs text-red-600 hover:bg-red-100 rounded-md">
													Tax Exemption
												</a>
											</div>
										</td>
										{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{donor.status}
										</td> */}
										{/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<a
												href="#"
												className="text-indigo-600 hover:text-indigo-900">
												Edit
											</a>
										</td> */}
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
