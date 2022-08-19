import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import { CourseProps } from "@/appTypes/typesForUs";

const Course = ({
  absoluteContent,
  centerContent,
  description,
  bottomContent,
  thumbnail,
  title,
  goToCoursePage,
  useDropdownDescription = true,
}: CourseProps) => {
  const [showDescription, setShowDescription] = useState(false);
  // Absolute content is the content displayed overlaying the courses. Center content is the content after the course thumbnail
  return (
    <div
      onClick={goToCoursePage}
      className='relative text-white bg-indigo-600 overflow-hidden rounded-xl w-full flex flex-col items-start justify-center break-all'
    >
      {absoluteContent ?? null}
      <div className='h-56 flex flex-col items-center justify-center'>
        <img
          src={thumbnail}
          alt={title}
          className='object-cover flex-grow min-h-full min-w-full'
        />
      </div>
      <div className='bg-blue-600 p-4 w-full flex flex-col items-start justify-start'>
        {centerContent}
        <p
          className={`block max-w-full ${
            useDropdownDescription && showDescription ? "" : "truncate"
          }`}
        >
          {description}
        </p>
        <div
          className={`${
            useDropdownDescription ? "" : "hidden"
          }flex items-center justify-center w-full`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDescription((prevShowDescription) => !prevShowDescription);
            }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              rotation={showDescription ? 180 : undefined}
            />
          </button>
        </div>
      </div>
      {bottomContent ?? null}
    </div>
  );
};

export default Course;
