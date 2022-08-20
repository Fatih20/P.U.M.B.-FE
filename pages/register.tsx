import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

import TeacherOrStudentButton from "@/components/auth/TeacherOrStudentButton";
import ErrorMessage from "@/components/errorMessage";
import { PossiblyCreatedRole, RegisterInputs } from "@/appTypes/typesForUs";
import { signup } from "@/utils/api/auth";
import toast from "react-hot-toast";
import technicalConfig from "@/config/technicalConfig";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>();

  // Role State
  const [selectedRole, setRole] = useState("STUDENT" as PossiblyCreatedRole);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (watch("password") !== watch("confirmPassword")) {
      toast.error("Password isn't matching!");
      return;
    }

    if (watch("username").length < technicalConfig.minimumUsernameLength) {
      toast.error(
        `Username must at least be ${technicalConfig.minimumUsernameLength} characters long!`
      );
      return;
    }

    const loadingToast = toast.loading("Signing up");
    data.role = selectedRole;
    const { result, error } = await signup(data);
    toast.dismiss(loadingToast);

    if (!result || error) {
      toast.error((error as any).response.data.message);
      return;
    }

    toast.success("Succesfully registered! You may now log in");
    router.push("/login");
  };

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-5'>
        <div className='mb-8'>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            App Name
          </h2>
        </div>

        {/* Instructor or Student Button */}
        <TeacherOrStudentButton role={selectedRole} setRole={setRole} />

        {/* Form Start */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-8 grid grid-cols-2 grid-rows-8 gap-2'
          action='#'
          method='POST'
        >
          <input type='hidden' name='remember' defaultValue='true' />

          <input
            {...register("username", { required: true, minLength: 3 })}
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm row-start-1 row-span-1 col-span-2'
            placeholder='Username'
          />
          <input
            {...register("email", { required: true })}
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm row-start-2 row-span-1 col-span-2'
            placeholder='Email'
            type='email'
          />
          <input
            {...register("first_name", { required: true })}
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm row-start-3 row-span-1 col-start-1 col-span-1'
            placeholder='First Name'
            type='text'
          />
          <input
            {...register("last_name", { required: true })}
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm row-start-3 row-span-1 col-start-2 col-span-1'
            placeholder='Last Name'
            type='text'
          />
          <input
            {...register("password", { required: true })}
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm row-start-4 row-span-1 col-span-2'
            placeholder='Password'
            type='password'
          />
          <input
            {...register("confirmPassword", { required: true })}
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm row-start-5 row-span-1 col-span-2'
            placeholder='Confirm Password'
            type='password'
          />
          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 row-start-6 row-span-1 col-span-2'
          >
            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' />
              </svg>
            </span>
            Register
          </button>

          <div className='text-center row-start-7 row-span-1 col-span-2'>
            <p>
              Already have an account?{" "}
              <a
                onClick={() => router.push("/login")}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                {" "}
                Login{" "}
              </a>
            </p>
          </div>
        </form>
        {/* Form End */}
      </div>
    </div>
  );
}
