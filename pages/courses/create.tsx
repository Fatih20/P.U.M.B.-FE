import React from "react";
import useMe from "../../hooks/useMe";
import BaseLayout from "../../layout/BaseLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import OverlayScreen from "../../components/loading/OverlayScreen";
import { useRouter } from "next/router";
import { CategoryInput, CreateCourseInput } from "../../types/typesForUs";
import { createCourse } from "../../utils/api/courses";
import toast from "react-hot-toast";

type Props = {};

const CreateCoursePage = (props: Props) => {
  const { user, isLoading, error } = useMe();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<CreateCourseInput>();

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
  }: CreateCourseInput) {
    const categoriesProcessed = categories.split(",").map((category) => {
      return { name: category.trim() } as CategoryInput;
    });
    const { result, error } = await createCourse({
      description,
      title,
      categories: categoriesProcessed,
      thumbnail_url:
        "https://designshack.net/wp-content/uploads/placeholder-image.png",
    });

    if (!result) {
      console.log(error);
      toast.error("Failed to create course. Please try again.");
      return;
    }
    console.log(result);
    toast.success("Succesfully created the course");
    const { id } = result.data;
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
            <label htmlFor='title' className='w-full'>
              Title
            </label>
            <input
              id='title'
              {...register("title")}
              placeholder='Course title'
              className='w-full p-2'
            />
          </div>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='categories' className='w-full'>
              Tags (comma separated)
            </label>
            <input
              className='w-full p-2'
              id='categories'
              {...register("categories")}
              placeholder='Course tag'
            />
          </div>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='description' className='w-full'>
              Description
            </label>
            <textarea
              className='w-full p-2'
              id='description'
              {...register("description")}
              placeholder='Course description'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 px-3 rounded-lg'
          >
            Create course
          </button>
        </form>
      </div>
    </BaseLayout>
  );
};

export default CreateCoursePage;
