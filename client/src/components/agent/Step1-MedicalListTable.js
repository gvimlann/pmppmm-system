export default function MedicalListTable({
	medicalList,
	handleChange,
	grandTotal,
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
										Item Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Unit Cost
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Requested
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Total Cost
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{medicalList.map((item) => (
									<tr key={item.id}>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{item.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											RM {item.unitCost}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											<input
												type="number"
												name={item.shortName}
												id={item.shortName}
												onChange={handleChange}
												min="0"
												value={item.requested}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											RM {item.totalCost}
										</td>
										{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{item.unitCost * }
										</td> */}
										{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{person.role}
										</td> */}
									</tr>
								))}
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{` `}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{` `}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-900">
										Total Cost
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-900">
										{grandTotal}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
