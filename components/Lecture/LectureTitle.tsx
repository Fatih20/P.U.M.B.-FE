import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { patchLectureTitle } from "@/utils/api/lecture";
import { LectureTitlePatch } from "@/appTypes/typesForUs";
import { useRouter } from "next/router";
import { getLectureById } from "@/utils/api/lecture";
import { useMutation, useQuery, useQueryClient } from "react-query";

type FormInput = {
  titleForm: string;
};

export default function LectureTitleForm({
  editable,
  courseID,
}: {
  editable: boolean;
  courseID: string;
}) {
  // Initiate Router
  const router = useRouter();
  const { lectureId } = router.query;

  const queryClient = useQueryClient();
  const queryName = `${lectureId}/title`;
  const {
    data: titleData,
    isLoading: titleLoading,
    isError: titleError,
  } = useQuery(queryName, async () => await getLectureById(lectureId));

  const { mutateAsync: modifyTitle } = useMutation(
    async (newTitle: string) => {
      await patchLectureTitle(lectureId as string, { title: newTitle });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryName);
      },
    }
  );

  // Initiate State
  const [titleVisibility, setTitleVisibility] = useState(true);
  const [form, setForm] = useState({ text: "", visibility: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const transformToForm = () => {
    if (editable) {
      setTitleVisibility(false);
      setForm({ ...form, visibility: true });
    }
  };

  const handleTitleSubmit: SubmitHandler<FormInput> = (data) => {
    const payload: LectureTitlePatch = {
      title: data.titleForm,
    };

    // PATCH Lecture with id
    modifyTitle(data.titleForm);
    setForm({ ...form, visibility: false });
    setTitleVisibility(true);
  };

  if (titleLoading || !titleData) {
    return <h2>Loading title...</h2>;
  }

  if (titleError) {
    return <h2>Error loading title...</h2>;
  }

  return (
    <>
      {/* Title */}
      {titleVisibility && (
        <h1 className='text-2xl text-bold' onClick={() => transformToForm()}>
          {titleData.data.title}
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
              className='text-center text-2xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register("titleForm", { required: true })}
              defaultValue={titleData.data.title}
              placeholder={titleData.data.title}
            />
          </div>
        </form>
      )}
    </>
  );
}
