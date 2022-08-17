import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import queryFetchingConfig from "../../config/queryFetchingConfig";
import { getCourse, subscribeToCourse } from "../../utils/api/courses";

type CourseHeaderProps = {
  courseID: string;
};

const CourseHeader = ({ courseID }: CourseHeaderProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    `courses/${courseID}`,
    async () => await getCourse(courseID),
    queryFetchingConfig
  );

  const { mutateAsync: enroll } = useMutation(
    async () => await subscribeToCourse(courseID),
    { onSuccess: () => queryClient.invalidateQueries("me") }
  );

  if (isLoading || !data) {
    return (
      <div className='flex flex-col items-start justify-center'>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className='flex flex-col items-start justify-center gap-3'>
      <img src={data.thumbnail_url} alt={data.title} />
      <div className='flex flex-col items-start justify-start'>
        <h2 className='text-3xl font-bold'>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <button
        className={`${
          true ? "" : "hidden"
        } self-start bg-indigo-600 text-white py-1 px-2 rounded-md`}
        onClick={async () => await enroll()}
      >
        Enroll
      </button>
    </div>
  );
};

export default CourseHeader;
