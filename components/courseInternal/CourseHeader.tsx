import Image from "next/image";
import React from "react";

type CourseHeaderProps = {
  // Thumbnail is a link
  thumbnail: string;
  title: string;
  description: string;
  enrolled: boolean;
  runOnEnroll: () => void;
};

const CourseHeader = ({
  thumbnail,
  description,
  title,
  enrolled,
  runOnEnroll,
}: CourseHeaderProps) => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <img src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className={`${enrolled ? "" : "hidden"}`} onClick={runOnEnroll}>
        Enroll
      </button>
      ;
    </div>
  );
};

export default CourseHeader;
