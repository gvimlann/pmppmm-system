import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AdminTransactionPopupModal({
  title,
  content,
  successText,
  cancelText,
  successHandle,
  cancelHandle,
  openModal,
  handleChange,
  formSubmitHandle,
  formData,
  setDate,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={(e) => !openModal}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
										{icon}
									</div> */}
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <Dialog.Title
                      as='h3'
                      className='text-xl leading-6 font-medium text-gray-900'
                    >
                      {title}
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>{content}</p>
                    </div>
                    <form onSubmit={formSubmitHandle} action='#' method='POST'>
                      <div className='overflow-hidden sm:rounded-md'>
                        <div className='bg-white pt-5'>
                          <div className='grid grid-cols-6 gap-6'>
                            <div className='col-span-6 sm:col-span-4'>
                              <label
                                htmlFor='first-name'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Donor Name
                              </label>
                              <input
                                type='text'
                                name='title'
                                id='title'
                                disabled
                                onChange={handleChange}
                                value={formData.donor.name}
                                className='py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                              />
                            </div>
                            <div className='col-span-6 sm:col-span-4'>
                              <label
                                htmlFor='status'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Status
                              </label>
                              <select
                                id='status'
                                name='status'
                                autoComplete='status'
                                onChange={handleChange}
                                value={formData.status}
                                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                              >
                                <option>PENDING</option>
                                <option>COMPLETED</option>
                                <option>REJECTED</option>
                                <option>APPROVED</option>
                              </select>
                            </div>
                            <div className='col-span-6 sm:col-span-4'>
                              <label
                                htmlFor='payment-type'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Payment Type
                              </label>
                              <select
                                id='paymentType'
                                name='paymentType'
                                onChange={handleChange}
                                value={formData.paymentType || " "}
                                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                              >
                                <option>{undefined}</option>
                                <option>CHEQUE</option>
                                <option>ONLINE_TRANSFER</option>
                              </select>
                            </div>
                            <div className='col-span-6 sm:col-span-4'>
                              <label
                                htmlFor='quotation-no'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Cheque No
                              </label>
                              <input
                                type='text'
                                name='chequeNo'
                                id='chequeNo'
                                onChange={handleChange}
                                value={formData.chequeNo || " "}
                                className='py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                              />
                            </div>

                            <div className='col-span-6 sm:col-span-4'>
                              <label
                                htmlFor='bank-name'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Bank Name
                              </label>
                              <select
                                id='bankName'
                                name='bankName'
                                onChange={handleChange}
                                value={formData.bankName || " "}
                                className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                              >
                                <option>{undefined}</option>
                                <option>HLB</option>
                                <option>CIMB</option>
                                <option>MBB</option>
                                <option>RHB</option>
                              </select>
                            </div>

                            {/* <div className="col-span-6 sm:col-span-4">
															<label
																htmlFor="client-name"
																className="block text-sm font-medium text-gray-700">
																Client Name
															</label>
															<select
																id="clientName"
																name="clientName"
																autoComplete="clientName"
																onChange={handleChange}
																value={formData.clientName}
																className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
																<option>HUME</option>
																<option>YTL RAWANG</option>
																<option>YTL KANTHAN</option>
																<option>YTL KANTHAN</option>
															</select>
														</div> */}

                            {/* <div className="col-span-6 sm:col-span-4">
															<label
																htmlFor="quotation-date"
																className="block text-sm font-medium text-gray-700">
																Quotation Date
															</label>
															<DatePicker
																name="quotationDate"
																selected={new Date(formData.quotationDate)}
																onChange={setDate}
																className="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
															/>
														</div> */}

                            {/* <div className="col-span-6 sm:col-span-4">
															<label
																htmlFor="quotation-no"
																className="block text-sm font-medium text-gray-700">
																Quotation No
															</label>
															<input
																type="text"
																name="quotationNo"
																id="quotationNo"
																autoComplete="quotationNo"
																onChange={handleChange}
																value={formData.quotationNo}
																className="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
															/>
														</div> */}

                            {/* <div className="col-span-6 sm:col-span-4">
															<label
																htmlFor="amount"
																className="block text-sm font-medium text-gray-700">
																Amount
															</label>
															<input
																type="number"
																name="amount"
																id="amount"
																autoComplete="amount"
																onChange={handleChange}
																value={formData.amount}
																className="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
															/>
														</div> */}

                            {/* <div className="col-span-6 sm:col-span-4">
															<label
																htmlFor="status"
																className="block text-sm font-medium text-gray-700">
																Status
															</label>
															<select
																id="status"
																name="status"
																autoComplete="status"
																onChange={handleChange}
																value={formData.status}
																className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
																<option>NOT_STARTED</option>
																<option>ONGOING</option>
																<option>COMPLETED</option>
															</select>
														</div> */}
                            {/* <div className="col-span-6 sm:col-span-4">
															<label
																htmlFor="purchaseOrderNo"
																className="block text-sm font-medium text-gray-700">
																Purchaser Order No
															</label>
															<input
																type="text"
																name="purchaseOrderNo"
																id="purchaseOrderNo"
																autoComplete="purchaseOrderNo"
																onChange={handleChange}
																value={formData.purchaseOrderNo}
																className="py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
															/>
														</div> */}
                          </div>
                        </div>
                        {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
													<button
														type="submit"
														className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
														Save
													</button>
												</div> */}
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-5 pt-5'>
                        <button
                          type='submit'
                          className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                          onClick={successHandle}
                        >
                          {successText}
                        </button>
                        <button
                          type='button'
                          className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                          onClick={cancelHandle}
                          ref={cancelButtonRef}
                        >
                          {cancelText}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
