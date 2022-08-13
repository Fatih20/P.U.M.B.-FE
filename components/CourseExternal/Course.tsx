import React, { ReactComponentElement, ReactElement } from "react";

type CourseProps = {
  absoluteContent?: JSX.Element;
  centerContent: JSX.Element;
  bottomContent?: JSX.Element;
  thumbnail: string;
};

const Course = ({
  absoluteContent,
  centerContent,
  bottomContent,
  thumbnail,
}: CourseProps) => {
  return (
    <div className="relative  bg-gray-600 overflow-hidden rounded-xl w-64 flex flex-col items-start justify-center">
      {absoluteContent ?? null}
      <div className="">
        <img src={thumbnail} alt="" />
      </div>
      <div className="bg-gray-400 p-4 w-full flex flex-col items-start justify-start">
        {centerContent}
      </div>
      {bottomContent ?? null}
    </div>
  );
};

export default Course;
