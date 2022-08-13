import Image from "next/image";
import React from "react";

type CourseHeaderProps = {
  // Thumbnail is a link
  thumbnail: string;
  title: string;
  description: string;
};

const CourseHeader = ({ thumbnail, description, title }: CourseHeaderProps) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <Image src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CourseHeader;
