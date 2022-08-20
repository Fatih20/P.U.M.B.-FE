import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { postLectureItem } from "@/utils/api/lecture";
import { ResourcePost } from "@/appTypes/typesForUs";

export default function LectureItemFormFactory({
  callback,
  type,
}: {
  callback?: any;
  type: string;
}) {
  // Initiate Router
  const router = useRouter();
  const { lectureId } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResourcePost>();

  // Post Video Resource
  const handleVideoSubmit: SubmitHandler<ResourcePost> = (data) => {
    const payload: ResourcePost = {
      ...data,
      name: "youtube video",
      lecture_id: parseInt(lectureId as string),
      type: "VIDEO",
    };

    postLectureItem(lectureId, payload).then((data) => {
      callback(data);
    });
  };
  if (type == "VIDEO") {
    return (
      <>
        <form onSubmit={handleSubmit(handleVideoSubmit)} className='w-full'>
          <div className='mb-6'>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register("url", { required: true })}
              // defaultValue="Youtube Video URL.."
              placeholder='Youtube Video URL..'
            />
          </div>
          {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button> */}
        </form>
      </>
    );
  }
  return null;
}
