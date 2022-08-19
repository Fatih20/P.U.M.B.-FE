import React from "react";
import { useQuery } from "react-query";
import { CourseContentProps } from "@/appTypes/typesForUs";
import { Lecture, Quiz } from "@/appTypes/typesFromBackEnd";
import OverlayScreen from "@/components/loading/OverlayScreen";
import CourseContentElement from "@/components/courseInternal/CourseContentElement";

const CourseContent = ({
  fetcherFunction,
  runOnDelete,
  runOnEdit,
  runOnClick,
  queryName,
  type,
  isTeacher = false,
}: CourseContentProps) => {
  const { data, isLoading } = useQuery(queryName, fetcherFunction);

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
            runOnDelete={runOnDelete}
            runOnEdit={runOnEdit}
            runOnClick={() => runOnClick(id.toString())}
            isTeacher={isTeacher}
          />
        );
      })}
    </div>
  );
};

export default CourseContent;
