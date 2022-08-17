import React from "react";
import { useQuery } from "react-query";
import {
  CourseContentElementProps,
  CourseContentElementType,
} from "../../types/typesForUs";
import { Lecture, Quiz } from "../../types/typesFromBackEnd";
import OverlayScreen from "../loading/OverlayScreen";
import CourseContentElement from "./CourseContentElement";

type CourseContentProps = {
  fetcherFunction: () => Promise<Lecture[] | Quiz[]>;
  runOnDelete: () => void;
  runOnEdit: () => void;
  runOnClick: (id: string) => void;
  queryName: string;
  type: CourseContentElementType;
  isTeacher?: boolean;
};

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
    return (
      <div className='flex flex-col flex-grow w-full justify-center items-center'>
        <h2>No {type} for this course</h2>
      </div>
    );
  }

  return (
    <div className='flex flex-col flex-grow w-full justify-start items-center'>
      {data.map(({ title, course_id, id }) => {
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
