import { useState } from 'react';

function TransactionForm({ donor, grandTotal, handleFormSubmit }) {
	const [transactionForm, setTransactionForm] = useState({});
	const handleChange = (e) => {
		setTransactionForm({ ...transactionForm, [e.target.name]: e.target.value });
	};
	return (
		<div className="mt-10 sm:mt-0">
			<div className="mt-5 md:mt-0 md:col-span-2">
				<form onSubmit={handleFormSubmit} action="#" method="POST">
					{/* {console.log(donor)} */}
					<div className="shadow overflow-hidden sm:rounded-md">
						{donor.isCompany ? (
							//  Company Form
							<div className="px-4 py-5 bg-white sm:p-6">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="flex mb-6">
										<span className="font-bold pr-2">Account Type: </span>
										Company
									</div>
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="company-name"
												className="block text-sm font-medium text-gray-700">
												Company Name
											</label>
											<input
												type="text"
												name="name"
												id="company-name"
												autoComplete="company-name"
												onChange={handleChange}
												disabled
												value={donor.name}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="registration-no"
												className="block text-sm font-medium text-gray-700">
												Registration No
											</label>
											<input
												type="text"
												name="registrationNo"
												id="registration-no"
												autoComplete="registration-no"
												onChange={handleChange}
												disabled
												value={donor.registrationNo}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-700">
												Email Address
											</label>
											<input
												type="text"
												name="email"
												id="email"
												autoComplete="email"
												onChange={handleChange}
												disabled
												value={donor.email}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="contact-person"
												className="block text-sm font-medium text-gray-700">
												Contact Person
											</label>
											<input
												type="text"
												name="contactPerson"
												id="contact-person"
												autoComplete="contact-person"
												onChange={handleChange}
												disabled
												value={donor.contactPerson}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="contact-number"
												className="block text-sm font-medium text-gray-700">
												Contact Number
											</label>
											<input
												type="number"
												name="contactNumber"
												id="contact-number"
												autoComplete="contact-number"
												onChange={handleChange}
												disabled
												value={donor.contactNumber}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="company-address"
												className="block text-sm font-medium text-gray-700">
												Company Address
											</label>
											<input
												type="text"
												name="address"
												id="company-address"
												autoComplete="company-address"
												onChange={handleChange}
												disabled
												value={donor.address}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="total-contribution"
												className="block text-sm font-medium text-gray-700">
												Total Contribution
											</label>
											<input
												type="text"
												name="totalContribution"
												id="total-contribution"
												autoComplete="total-contribution"
												onChange={handleChange}
												disabled
												value={grandTotal}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
							</div>
						) : (
							// Personal Form
							<div className="px-4 py-5 bg-white sm:p-6">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="flex mb-6">
										<span className="font-bold pr-2">Account Type: </span>
										Personal
									</div>
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="company-name"
												className="block text-sm font-medium text-gray-700">
												Name
											</label>
											<input
												type="text"
												name="name"
												id="company-name"
												autoComplete="company-name"
												onChange={handleChange}
												disabled
												value={donor.name}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="ic-number"
												className="block text-sm font-medium text-gray-700">
												IC Number
											</label>
											<input
												type="text"
												name="icNumber"
												id="ic-number"
												autoComplete="ic-number"
												onChange={handleChange}
												disabled
												value={donor.icNumber}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-700">
												Email Address
											</label>
											<input
												type="text"
												name="email"
												id="email"
												autoComplete="email"
												onChange={handleChange}
												disabled
												value={donor.email}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										{/* <div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="contact-person"
												className="block text-sm font-medium text-gray-700">
												Contact Person
											</label>
											<input
												type="text"
												name="contactPerson"
												id="contact-person"
												autoComplete="contact-person"
												onChange={handleChange}
												disabled
												value={donor.contactPerson}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="contact-number"
												className="block text-sm font-medium text-gray-700">
												Contact Number
											</label>
											<input
												type="number"
												name="contactNumber"
												id="contact-number"
												autoComplete="contact-number"
												onChange={handleChange}
												disabled
												value={donor.contactNumber}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="address"
												className="block text-sm font-medium text-gray-700">
												Address
											</label>
											<input
												type="text"
												name="address"
												id="address"
												autoComplete="address"
												onChange={handleChange}
												disabled
												value={donor.address}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="total-contribution"
												className="block text-sm font-medium text-gray-700">
												Total Contribution
											</label>
											<input
												type="text"
												name="totalContribution"
												id="total-contribution"
												autoComplete="total-contribution"
												onChange={handleChange}
												disabled
												value={grandTotal}
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
							<button
								type="submit"
								className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default TransactionForm;
