import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { toast } from "react-hot-toast"
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const {register, handleSubmit} = useForm();

  const [login] = useLoginMutation()


  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();

      dispatch(setCredentials(result.user));
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
  
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Login failed");
    }
  };
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black py-4 sm:py-6 lg:py-0'>
      <div className='w-full max-w-7xl mx-auto flex gap-4 sm:gap-8 lg:gap-12 xl:gap-20 flex-col-reverse lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8'>
        {/* Left Section - Hero Content */}
        <div className='w-full lg:w-1/2 xl:w-2/3 flex flex-col items-center justify-center order-2 lg:order-1 py-8 lg:py-0'>
          <div className='w-full max-w-lg xl:max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 xl:gap-10'>
            <span className='flex gap-1 py-1.5 px-4 sm:px-3 border rounded-full text-xs sm:text-sm md:text-base dark:border-gray-700 dark:text-blue-400 border-gray-300 text-gray-600 whitespace-nowrap'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center dark:text-gray-400 text-blue-700'>
              <span>Cloud-based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell hidden sm:block'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className='w-full lg:w-1/2 xl:w-1/3 flex flex-col justify-center items-center order-1 lg:order-2'>
          <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[400px] flex flex-col gap-y-6 sm:gap-y-8 bg-white dark:bg-slate-900 px-6 sm:px-8 md:px-10 pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-12 md:pb-14 rounded-lg sm:rounded-xl shadow-lg">
            <p className='text-blue-600 text-center font-bold text-2xl sm:text-3xl'>Welcome Back</p>
            <p className='text-center text-sm sm:text-base text-gray-700 dark:text-gray-500'>
              Keep all your credentials safe!
            </p>
            <div className='flex flex-col gap-y-4 sm:gap-y-5'>
   
              <input 
                name='email'
                type='email'
                placeholder='Enter email...'
                {...register("email", {required: "Email is required"})}
                className='w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
              />

              <input 
                name='password'
                placeholder='Enter password...'
                type='password'
                  {...register("password", {required: "Password is required"})}
                className='w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
              />
           
           <span
            className='text-blue-600 hover:text-blue-700 text-sm sm:text-base'>
                Forget Password?
        
             
             </span>
            </div>
            <button 
              type='submit'
              className='w-full px-4 sm:px-6 py-3 sm:py-3.5 mt-2 sm:mt-4 text-sm sm:text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
