import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRegisterMutation, useGetAdminInfoQuery } from '../redux/slices/api/authApiSlice';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { MdAdminPanelSettings, MdPerson } from 'react-icons/md';

function Register() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fetch whether an admin already exists in the DB
  const { data: adminInfo, isLoading: isLoadingAdminInfo } = useGetAdminInfoQuery();
  const hasAdmin = adminInfo?.hasAdmin;
  const adminName = adminInfo?.adminName;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { role: 'User' } });

  const selectedRole = watch('role');

  // If admin already exists, force role to "User"
  useEffect(() => {
    if (hasAdmin) {
      setValue('role', 'User');
    }
  }, [hasAdmin, setValue]);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const submitHandler = async (data) => {
    const isAdmin = data.role === 'Admin';

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        title: isAdmin ? 'Administrator' : 'Team Member',
        isAdmin,
      }).unwrap();

      toast.success(result?.message || 'Registration successful! Please login.');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || 'Registration failed');
    }
  };

  // Already logged in → go to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black py-6 sm:py-8 lg:py-0'>
      <div className='w-full max-w-7xl mx-auto flex gap-4 sm:gap-8 lg:gap-12 xl:gap-20 flex-col-reverse lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8'>

        {/* Left branding */}
        <div className='w-full lg:w-1/2 xl:w-2/3 flex flex-col items-center justify-center order-2 lg:order-1 py-8 lg:py-0'>
          <div className='w-full max-w-lg xl:max-w-3xl flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 xl:gap-10'>
            <span className='flex gap-1 py-1.5 px-4 sm:px-3 border rounded-full text-xs sm:text-sm md:text-base dark:border-gray-700 dark:text-blue-400 border-gray-300 text-gray-600 whitespace-nowrap'>
              Manage all your tasks in one place!
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

        {/* Right register form */}
        <div className='w-full lg:w-1/2 xl:w-1/3 flex flex-col justify-center items-center order-1 lg:order-2'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[400px] flex flex-col gap-y-6 sm:gap-y-8 bg-white dark:bg-slate-900 px-6 sm:px-8 md:px-10 pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-12 md:pb-14 rounded-lg sm:rounded-xl shadow-lg'
          >
            {/* Header */}
            <div>
              <p className='text-blue-600 text-center font-bold text-2xl sm:text-3xl'>Create Account</p>
              <p className='text-center text-sm sm:text-base text-gray-700 dark:text-gray-500 mt-1'>
                Join us and start managing your tasks!
              </p>
            </div>

            {/* ── Admin name card ── shown prominently when admin already exists */}
            {isLoadingAdminInfo ? (
              <div className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 border border-gray-200 rounded-xl'>
                <div className='w-2 h-2 rounded-full bg-gray-300 animate-pulse' />
                <span className='text-xs text-gray-400'>Checking registration status...</span>
              </div>
            ) : hasAdmin ? (
              <div className='w-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-4 py-4 flex items-center gap-4 shadow-md'>
                {/* Initials avatar */}
                <div className='w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0'>
                  <span className='text-white font-bold text-base'>
                    {adminName
                      ? adminName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
                      : 'AD'}
                  </span>
                </div>
                {/* Name & label */}
                <div className='min-w-0 flex-1'>
                  <p className='text-white/70 text-xs font-medium uppercase tracking-widest mb-0.5'>
                    System Admin
                  </p>
                  <p className='text-white font-bold text-base sm:text-lg truncate'>
                    {adminName}
                  </p>
                </div>
                <MdAdminPanelSettings className='text-white/60 text-3xl shrink-0' />
              </div>
            ) : (
              <div className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-green-50 border border-green-200 rounded-xl'>
                <span className='w-2 h-2 rounded-full bg-green-400 inline-block' />
                <span className='text-xs text-green-700 font-medium'>No admin yet — you can register as Admin</span>
              </div>
            )}

            <div className='flex flex-col gap-y-4 sm:gap-y-5'>

              {/* Role selector */}
              <div className='flex flex-col gap-y-2'>
                <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Select Role
                </label>

                {hasAdmin ? (
                  // Admin exists — only User is available
                  <div className='flex gap-3'>
                    <label className='flex-1 flex items-center gap-2 border-2 border-blue-500 bg-blue-50 rounded-lg px-4 py-3 cursor-pointer'>
                      <input
                        type='radio'
                        value='User'
                        {...register('role', { required: 'Role is required' })}
                        className='accent-blue-600'
                        defaultChecked
                      />
                      <MdPerson className='text-blue-600 text-lg' />
                      <span className='text-sm font-medium text-blue-800'>User</span>
                    </label>
                    <div className='flex-1 flex items-center gap-2 border-2 border-gray-200 bg-gray-50 rounded-lg px-4 py-3 opacity-40 cursor-not-allowed select-none'>
                      <MdAdminPanelSettings className='text-gray-400 text-lg' />
                      <span className='text-sm font-medium text-gray-400'>Admin</span>
                      <span className='ml-auto text-[10px] text-gray-400'>Taken</span>
                    </div>
                  </div>
                ) : (
                  // No admin yet — both options available
                  <div className='flex gap-3'>
                    {['User', 'Admin'].map((r) => (
                      <label
                        key={r}
                        className={`flex-1 flex items-center gap-2 border-2 rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                          selectedRole === r
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type='radio'
                          value={r}
                          {...register('role', { required: 'Role is required' })}
                          className='accent-blue-600'
                        />
                        {r === 'Admin' ? (
                          <MdAdminPanelSettings className={`text-lg ${selectedRole === r ? 'text-blue-600' : 'text-gray-400'}`} />
                        ) : (
                          <MdPerson className={`text-lg ${selectedRole === r ? 'text-blue-600' : 'text-gray-400'}`} />
                        )}
                        <span className={`text-sm font-medium ${selectedRole === r ? 'text-blue-800' : 'text-gray-600'}`}>
                          {r}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {errors.role && (
                  <span className='text-red-500 text-xs pl-1'>{errors.role.message}</span>
                )}
              </div>

              {/* Full Name */}
              <div className='flex flex-col gap-y-1'>
                <input
                  type='text'
                  placeholder='Enter full name...'
                  {...register('name', { required: 'Full name is required' })}
                  className='w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
                />
                {errors.name && (
                  <span className='text-red-500 text-xs sm:text-sm pl-2'>{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className='flex flex-col gap-y-1'>
                <input
                  type='email'
                  placeholder='Enter email...'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  className='w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
                />
                {errors.email && (
                  <span className='text-red-500 text-xs sm:text-sm pl-2'>{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className='flex flex-col gap-y-1'>
                <input
                  type='password'
                  placeholder='Enter password...'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  className='w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
                />
                {errors.password && (
                  <span className='text-red-500 text-xs sm:text-sm pl-2'>{errors.password.message}</span>
                )}
              </div>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <button
                type='submit'
                className='w-full px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Create Account
              </button>
            )}

            <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-600 hover:text-blue-700 font-medium'>
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
