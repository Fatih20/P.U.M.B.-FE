import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import queryFetchingConfig from "../../config/queryFetchingConfig";
import { getCourse, subscribeToCourse } from "../../utils/api/courses";
import OverlayScreen from "../loading/OverlayScreen";
import toast from "react-hot-toast";

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
    { onSuccess: () => queryClient.invalidateQueries(`courses/${courseID}`) }
  );

  if (isLoading || !data) {
    return (
      <OverlayScreen
        displayedText='Loading course data'
        overlayType='loading'
      />
    );
  }

  if (isError) {
    return (
      <OverlayScreen
        displayedText='Error getting course data'
        overlayType='error'
      />
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
          data.enrolled ? "hidden" : ""
        } self-start bg-indigo-600 text-white py-1 px-2 rounded-md`}
        onClick={async () => {
          const { error } = await enroll();
          if (!error) {
            toast.success("Succesfully enrolled in this course");
          } else {
            toast.error("Failed to enroll in this course. Please try again");
          }
        }}
      >
        Enroll
      </button>
    </div>
  );
};

export default CourseHeader;
