import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { QuizPatch } from "@/appTypes/typesForUs";
import { useRouter } from "next/router";
import Emitter from "@/utils/emiiter";

export default function QuizTitleForm({
  text,
  editable,
}: {
  text: string;
  editable: boolean;
}) {
  // Initiate Router
  const router = useRouter();
  const { lectureId } = router.query;

  // Initiate State
  const [title, setTitle] = useState({ visibility: true, id: null });
  const [form, setForm] = useState({ visibility: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizPatch>();

  const transformToForm = () => {
    if (editable) {
      setTitle({ ...title, visibility: false });
      setForm({ ...form, visibility: true });
    }
  };

  const handleTitleSubmit: SubmitHandler<QuizPatch> = (data) => {
    Emitter.emit("QUIZ_PATCH", data);

    setTitle({ ...title, visibility: true });
    setForm({ ...form, visibility: false });
  };

  return (
    <>
      {/* Title */}
      {title.visibility && (
        <h1 className='text-2xl text-bold' onClick={() => transformToForm()}>
          {text}
        </h1>
      )}

      {/* Form */}
      {form.visibility && (
        <form
          className='rounded bg-white'
          onSubmit={handleSubmit(handleTitleSubmit)}
        >
          <div className='mb-6'>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register("title", { required: true })}
              defaultValue={text}
              placeholder='Quiz Title'
            />
          </div>
          {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button> */}
        </form>
      )}
    </>
  );
}
