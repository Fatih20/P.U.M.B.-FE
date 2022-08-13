import React, { useState } from "react";
import Course from "./Course";
import TagName from "../TagName";

type CourseForStudentProps = {
  title: string;
  instructorName: string;
  tag: string;
  description: string;
  // Link to the image, not an actual image
  thumbnail: string;
};

const CourseForStudent = ({
  title,
  description,
  instructorName,
  tag,
  thumbnail,
}: CourseForStudentProps) => {
  const tagAndContainer = (
    <div className="absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end pointer-events-none">
      <TagName
        tagName={tag}
        runOnClick={() => {
          return;
        }}
      />
    </div>
  );

  const centerContent = (
    <>
      <h2 className="text-2xl font-bold whitespace-normal">{title}</h2>
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
      title={title}
      description={description}
    />
  );
};

export default CourseForStudent;
