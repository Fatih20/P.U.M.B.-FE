import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useMe from "../../hooks/useMe";
import { CourseProps } from "../../types/typesForUs";

const Course = ({
  absoluteContent,
  centerContent,
  description,
  bottomContent,
  thumbnail,
  title,
  id,
  useDropdownDescription = true,
}: CourseProps) => {
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();
  const { user } = useMe();
  const targetRoute =
    (user?.role ?? "TEACHER") === "ADMIN"
      ? `${router.asPath}/courses/${id}`
      : `${router.asPath}/${id}`;

  return (
    <div
      onClick={() => router.push(targetRoute)}
      className='relative text-white bg-indigo-600 overflow-hidden rounded-xl w-full flex flex-col items-start justify-center break-all'
    >
      {absoluteContent ?? null}
      <div className='h-56'>
        <img src={thumbnail} alt={title} className='object-cover' />
      </div>
      <div className='bg-indigo-400 p-4 w-full flex flex-col items-start justify-start'>
        {centerContent}
        <p
          className={`block max-w-full ${
            useDropdownDescription && showDescription ? "" : "truncate"
          }`}
        >
          {description}
        </p>
        <div
          onClick={(e) => e.stopPropagation()}
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
