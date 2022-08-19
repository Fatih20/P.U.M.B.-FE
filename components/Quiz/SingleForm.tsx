import { useForm, SubmitHandler } from "react-hook-form";
import { QuestionStatement, SingleFormType } from "@/appTypes/typesForUs";
import Emitter from "@/utils/emiiter";
import { patchQuestionStatement } from "@/utils/api/quiz";
import { QueryClient, useMutation } from "react-query";

export default function SingleForm({ placeholder, callback, id, defaultValue }: SingleFormType) {
  const queryClient = new QueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionStatement>();


 

  return (
    <>
      <form
        className='rounded  bg-white'
        onSubmit={handleSubmit((data) => callback(id,data))}
      >
        <input
          type='text'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register("statement", { required: true })}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
      </form>
    </>
  );
}
