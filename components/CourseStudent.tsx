import React from "react";
import Course from "./Course";
import TagName from "./TagName";

type CourseStudentProps = {
  title: string;
  shortenedDescription: string;
  instructorName: string;
  tag: string;
  // Link to the image, not an actual image
  thumbnail: string;
};

const CourseStudent = ({
  title,
  shortenedDescription,
  instructorName,
  tag,
  thumbnail,
}: CourseStudentProps) => {
  const tagAndContainer = (
    <div className="absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end">
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
      <p className="whitespace-normal">{shortenedDescription}</p>
    </>
  );
  return (
    <Course
      absoluteContent={tagAndContainer}
      centerContent={centerContent}
      thumbnail={thumbnail}
    />
  );
};

export default CourseStudent;
