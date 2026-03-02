import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '../redux/slices/api/authApiSlice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailFromQuery,
      password: '',
      confirmPassword: '',
    },
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    reset({
      email: emailFromQuery,
      password: '',
      confirmPassword: '',
    });
  }, [emailFromQuery, reset]);

  const submitHandler = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const result = await forgotPassword(payload).unwrap();
      toast.success(result?.message || 'Password updated successfully');
      reset({ email: data.email, password: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-[#f3f4f6] py-4 sm:py-6 lg:py-10'>
      <div className='w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-blue-600 text-center font-bold text-2xl mb-2'>Forgot Password</h2>
        <p className='text-center text-sm text-gray-600 mb-4'>
          Enter your email and set a new password.
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <input
              type='email'
              placeholder='email@example.com'
              {...register('email', { required: 'Email is required' })}
              className='w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && (
              <span className='text-red-500 text-sm ml-2'>{errors.email.message}</span>
            )}
          </div>

          <div className='flex flex-col gap-1'>
            <input
              type='password'
              placeholder='New password'
              {...register('password', {
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className='w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.password && (
              <span className='text-red-500 text-sm ml-2'>{errors.password.message}</span>
            )}
          </div>

          <div className='flex flex-col gap-1'>
            <input
              type='password'
              placeholder='Confirm new password'
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              className='w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.confirmPassword && (
              <span className='text-red-500 text-sm ml-2'>{errors.confirmPassword.message}</span>
            )}
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='w-full px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors'
            >
              Update Password
            </button>
          )}

          <Link
            to='/login'
            className='inline-block w-full text-center px-6 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold transition-colors'
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
