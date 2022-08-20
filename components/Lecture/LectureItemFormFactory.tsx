import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { postLectureItem } from "@/utils/api/lecture";
import { ResourcePost } from "@/appTypes/typesForUs";
import { useMutation, QueryClient, useQuery } from "react-query";
import Emitter from "@/utils/emiiter";

export default function LectureItemFormFactory({
  callback,
  type,
}: {
  callback?: any;
  type: string;
}) {
  const queryClient = new QueryClient();

  // Initiate Router
  const router = useRouter();
  const { lectureId } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResourcePost>();


  // Mutate Video POST
  const { mutate: postLectureItemMutate } = useMutation(postLectureItem, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('Lectures')
      Emitter.emit("LECTURE_ITEM_POST", "");
    }
  });

  const handleVideoSubmit: SubmitHandler<ResourcePost> = (payload) => {
    if(lectureId !== undefined){
      const data: ResourcePost = {
        ...payload,
        name: "Youtube Video URL",
        lecture_id: lectureId as string,
        type: "VIDEO",
      };
      postLectureItemMutate({data})
    }
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
        </form>
      </>
    );
  }
  return null;
}
