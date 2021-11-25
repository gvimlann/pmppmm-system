import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { Context } from '../context';

export default function AgentRegister() {
  const history = useHistory();

  // email: email,
  //   username: username,
  //   fullName: fullName,
  //   icNumber: icNumber,
  //   contactNumber: contactNumber,
  //   hashedPassword: hashedPassword,

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    contactNumber: undefined,
    confirmPassword: "",
    icNumber: undefined,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", formData);
      console.log(data);
      // console.log(res);
      // window.localStorage.setItem('user', JSON.stringify(res.data));
      if (data.role === "ADMIN") {
        history.push("/admin/agent");
      } else if (data.role === "AGENT") {
        history.push("/agent/donor");
      }
    } catch (err) {
      // console.log(err.response);
      setError(err.response.data);
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <form onSubmit={submitFormData} action='#' method='POST'>
          <div className='shadow overflow-hidden sm:rounded-md'>
            <div className='px-4 py-5 bg-white sm:p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <span className='text-2xl font-bold'>Register</span>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    autoComplete='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='py-2 px-3 mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='full-name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='fullName'
                    id='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='py-2 px-3 mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='ic-number'
                    className='block text-sm font-medium text-gray-700'
                  >
                    IC Number
                  </label>
                  <input
                    type='number'
                    name='icNumber'
                    id='icNumber'
                    value={formData.icNumber}
                    onChange={handleChange}
                    className='py-2 px-3 mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='contact-number'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Contact Number
                  </label>
                  <input
                    type='number'
                    name='contactNumber'
                    id='contactNumber'
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className='py-2 px-3 mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='py-2 px-3 mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='confirm-password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='py-2 px-3 mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
              </div>
              {error !== "" && (
                <div className='mt-6 px-4 py-2 bg-red-200 rounded-md text-sm font-semibold'>
                  {error}
                </div>
              )}
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
