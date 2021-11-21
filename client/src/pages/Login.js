import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { Context } from '../context';

function Login() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "gvimlan@minedmind.my",
    password: "password",
    accountType: "agent",
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
      console.log(err);
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <form onSubmit={submitFormData} action='#' method='POST'>
          <div className='shadow overflow-hidden sm:rounded-md'>
            <div className='px-4 py-5 bg-white sm:p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <span className='text-2xl font-bold'>Login</span>
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
                  <label className='block text-sm font-medium text-gray-700 items-center mb-2'>
                    Account Type:
                  </label>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      className='form-radio'
                      name='accountType'
                      value='agent'
                      onChange={handleChange}
                      defaultChecked
                    />
                    <span className='ml-2 text-sm'>Agent</span>
                  </label>
                  <label className='inline-flex items-center ml-5'>
                    <input
                      type='radio'
                      className='form-radio'
                      name='accountType'
                      value='admin'
                      onChange={handleChange}
                    />
                    <span className='ml-2 text-sm'>Admin</span>
                  </label>
                </div>

                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='last-name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='py-2 px-3 mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
