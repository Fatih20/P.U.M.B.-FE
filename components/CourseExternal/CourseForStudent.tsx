import React, { useState } from "react";
import Course from "./Course";
import TagName from "../TagName";
import { CourseForStudentProps } from "../../types/TypesForUs";

const CourseForStudent = ({
  name,
  description,
  instructorName,
  tags,
  thumbnail,
}: CourseForStudentProps) => {
  const tagAndContainer = (
    <div className="absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end pointer-events-none">
      <TagName
        name={tags[0].name}
        runOnClick={() => {
          return;
        }}
      />
    </div>
  );

  const centerContent = (
    <>
      <h2 className="text-2xl font-bold whitespace-normal">{name}</h2>
      <h3 className="whitespace-normal text-lg font-medium">
        {instructorName}
      </h3>
    </>
  );
  return (
    <Course
      absoluteContent={tagAndContainer}
      centerContent={centerContent}
      thumbnail={thumbnail}
      name={name}
      description={description}
    />
  );
};

export default CourseForStudent;
