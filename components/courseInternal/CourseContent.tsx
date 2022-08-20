import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CourseContentProps } from "@/appTypes/typesForUs";
import { Lecture, Quiz } from "@/appTypes/typesFromBackEnd";
import OverlayScreen from "@/components/loading/OverlayScreen";
import CourseContentElement from "@/components/courseInternal/CourseContentElement";
import { useRouter } from "next/router";
import { deleteCourseContentElement } from "@/utils/api/quiz";
import toast from "react-hot-toast";

const CourseContent = ({
  fetcherFunction,
  queryName,
  type,
  courseID,
  isTeacher,
}: CourseContentProps) => {
  const router = useRouter();
  const { data, isLoading } = useQuery(queryName, fetcherFunction);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteElement } = useMutation(
    async (elementID: string) =>
      await deleteCourseContentElement(elementID, type),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryName);
        toast.success(`Succesfully deleted the ${type}`);
      },
      onError: () => {
        toast.success(`Failed to delete the ${type}`);
      },
    }
  );

  if (isLoading || !data) {
    return (
      <OverlayScreen
        displayedText={`Loading ${type} in this course`}
        overlayType='loading'
      />
    );
  }

  if (data.length === 0) {
    return <OverlayScreen displayedText={`No ${type} for this course`} />;
  }

  return (
    <div className='flex flex-col flex-grow w-full justify-start items-center gap-3'>
      {data.map(({ title, id }) => {
        return (
          <CourseContentElement
            key={id}
            title={title}
            type={type}
            runOnClick={() => {
              router.push(`/course/${courseID}/${type}/${id}`);
            }}
            runOnDelete={async () => await deleteElement(id)}
            runOnEdit={() => {
              router.push(`/course/${courseID}/${type}/edit/${id}`);
            }}
            isTeacher={isTeacher}
          />
        );
      })}
    </div>
  );
};

export default CourseContent;
