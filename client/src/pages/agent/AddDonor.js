import { useEffect, useState } from 'react';
import axios from 'axios';
import AgentLayout from '../../components/AgentLayout';
import { useHistory } from 'react-router-dom';

function AddDonor() {
	let history = useHistory();
	const [isCompany, setIsCompany] = useState(false);
	const [donorInfo, setDonorInfo] = useState({
		isCompany: false,
		name: '',
		registrationNo: '',
		icNumber: '',
		contactNumber: '',
		contactPerson: '',
		email: '',
		address: '',
	});

	useEffect(() => {
		// console.log(donorInfo);
	}, [donorInfo]);

	const updateCompanyCheckbox = () => {
		setDonorInfo({ ...donorInfo, isCompany: !isCompany });
		setIsCompany(!isCompany);
	};

	const handleChange = (e) => {
		setDonorInfo({ ...donorInfo, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post('/donor/create', {
				donorInfo,
				agentId: 1,
			});
			if (data.success) {
				history.push('/');
			}
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AgentLayout>
			<div className="mt-10 sm:mt-0">
				<div className="col-span-2 sm:col-span-2 mb-2">
					<label className="inline-flex items-center">
						<input
							name="isCompany"
							onChange={updateCompanyCheckbox}
							defaultChecked={isCompany}
							className="text-indigo-500 w-6 h-6 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded"
							type="checkbox"
						/>
						Tick Here If Donor Is A Company
					</label>
				</div>

				<div className="mt-5 md:mt-0 md:col-span-2">
					<form onSubmit={handleFormSubmit} action="#" method="POST">
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="px-4 py-5 bg-white sm:p-6">
								{isCompany ? (
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											<div className="col-span-6 sm:col-span-6">
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
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>

											{/* <div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="country"
												className="block text-sm font-medium text-gray-700">
												Country
											</label>
											<select
												id="country"
												name="country"
												autoComplete="country-name"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
										</div> */}

											<div className="col-span-6">
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
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>

											{/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="city"
												className="block text-sm font-medium text-gray-700">
												City
											</label>
											<input
												type="text"
												name="city"
												id="city"
												autoComplete="address-level2"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}

											{/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="region"
												className="block text-sm font-medium text-gray-700">
												State / Province
											</label>
											<input
												type="text"
												name="region"
												id="region"
												autoComplete="address-level1"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}

											{/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="postal-code"
												className="block text-sm font-medium text-gray-700">
												ZIP / Postal code
											</label>
											<input
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}
										</div>
									</div>
								) : (
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											<div className="col-span-6 sm:col-span-6">
												<label
													htmlFor="person-name"
													className="block text-sm font-medium text-gray-700">
													Person Name
												</label>
												<input
													type="text"
													name="name"
													id="person-name"
													autoComplete="person-name"
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label
													htmlFor="ic-number"
													className="block text-sm font-medium text-gray-700">
													IC No
												</label>
												<input
													type="text"
													name="icNumber"
													id="ic-number"
													autoComplete="ic-number"
													onChange={handleChange}
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
												type="number"
												name="contact-person"
												id="contact-person"
												autoComplete="contact-person"
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
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>

											{/* <div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="country"
												className="block text-sm font-medium text-gray-700">
												Country
											</label>
											<select
												id="country"
												name="country"
												autoComplete="country-name"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
										</div> */}

											<div className="col-span-6">
												<label
													htmlFor="home-address"
													className="block text-sm font-medium text-gray-700">
													Home Address
												</label>
												<input
													type="text"
													name="address"
													id="home-address"
													autoComplete="home-address"
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>

											{/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="city"
												className="block text-sm font-medium text-gray-700">
												City
											</label>
											<input
												type="text"
												name="city"
												id="city"
												autoComplete="address-level2"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}

											{/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="region"
												className="block text-sm font-medium text-gray-700">
												State / Province
											</label>
											<input
												type="text"
												name="region"
												id="region"
												autoComplete="address-level1"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}

											{/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="postal-code"
												className="block text-sm font-medium text-gray-700">
												ZIP / Postal code
											</label>
											<input
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div> */}
										</div>
									</div>
								)}
							</div>
							<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
								<button
									type="submit"
									className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Add Donor
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</AgentLayout>
	);
}

export default AddDonor;
