import React, { useEffect, useMemo } from "react";
import useMe from "../../hooks/useMe";
import BaseLayout from "../../layout/BaseLayout";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import OverlayScreen from "../../components/loading/OverlayScreen";
import { useRouter } from "next/router";
import { CategoryInput, CreateCourseInput } from "../../types/typesForUs";
import { createCourse } from "../../utils/api/courses";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

type Props = {};

const CreateCoursePage = (props: Props) => {
  const { user, isLoading, error } = useMe();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<CreateCourseInput>();

  if (isLoading) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Loading credentials'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  if (error) {
    router.push("/login");
    return (
      <BaseLayout>
        <OverlayScreen displayedText='Unauthorized' overlayType='plain' />
      </BaseLayout>
    );
  }

  if (user.role !== "TEACHER") {
    router.push("/");
    return (
      <BaseLayout>
        <OverlayScreen displayedText='Unauthorized' overlayType='plain' />
      </BaseLayout>
    );
  }

  async function handleCreateCourse({
    categories,
    description,
    title,
    thumbnail,
  }: CreateCourseInput) {
    const loadingToast = toast.loading("Creating the course...");
    const categoriesProcessed = categories.split(",").map((category) => {
      return { name: category.trim() } as CategoryInput;
    });

    const formDataSubmitted = new FormData();
    formDataSubmitted.append("title", title);
    formDataSubmitted.append("description", description);
    formDataSubmitted.append("categories", JSON.stringify(categoriesProcessed));
    formDataSubmitted.append("file", thumbnail[0]);

    const { result, error } = await createCourse(formDataSubmitted);
    toast.dismiss(loadingToast);

    if (!result) {
      console.log(error);
      toast.error("Failed to create course. Please try again.");
      return;
    }
    toast.success("Succesfully created the course");
    const { id } = result.data;
    queryClient.invalidateQueries("coursesMineTeacher");
    router.push(`/courses/${id}`);
    reset();
  }

  return (
    <BaseLayout>
      <div className='flex flex-col items-center justify-center flex-grow w-full max-w-3xl py-5 gap-4'>
        <h2 className='text-indigo-600 font-bold text-3xl border-b-2 border-indigo-600 w-full block text-center'>
          Add a new course
        </h2>
        <form
          action=''
          onSubmit={handleSubmit(handleCreateCourse)}
          className='flex flex-col items-center justify-start flex-grow w-full gap-3'
        >
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='thumbnail' className='w-full'>
              Title
            </label>
            <input
              accept='image/*'
              type='file'
              id='thumbnail'
              {...register("thumbnail", {
                required: "The course must have a thumbnail!",
              })}
              placeholder='Course thumbnail'
              className='w-full p-2'
            />
            {formErrors.title && (
              <p className='text-red-400'>{formErrors.title.message}</p>
            )}
          </div>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='title' className='w-full'>
              Title
            </label>
            <input
              id='title'
              {...register("title", {
                required: "The course must have a description!",
              })}
              placeholder='Course title'
              className='w-full p-2'
            />
            {formErrors.title && (
              <p className='text-red-400'>{formErrors.title.message}</p>
            )}
          </div>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='categories' className='w-full'>
              Tags (comma separated)
            </label>
            <input
              className='w-full p-2'
              id='categories'
              {...register("categories", {
                required: "The course must have at least one category!",
              })}
              placeholder='Course tag'
            />
            {formErrors.categories && (
              <p className='text-red-400'>{formErrors.categories.message}</p>
            )}
          </div>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='description' className='w-full'>
              Description
            </label>
            <textarea
              className='w-full p-2'
              id='description'
              {...register("description", {
                required: "The course must have a description!",
              })}
              placeholder='Course description'
            />
            {formErrors.description && (
              <p className='text-red-400'>{formErrors.description.message}</p>
            )}
          </div>

          <button
            type='submit'
            className={`w-full bg-indigo-600 text-white py-2 px-3 rounded-lg`}
          >
            Create course
          </button>
        </form>
      </div>
    </BaseLayout>
  );
};

export default CreateCoursePage;
