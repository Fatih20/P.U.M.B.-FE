import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Router from "next/router";
import React, {
  ReactComponentElement,
  ReactElement,
  useEffect,
  useState,
} from "react";
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

  return (
    <div
      onClick={() => Router.push(`${Router.asPath}/${id}`)}
      className="relative text-white bg-indigo-600 overflow-hidden rounded-xl w-full flex flex-col items-start justify-center break-all"
    >
      {absoluteContent ?? null}
      <div className="h-56">
        <img src={thumbnail} alt={title} className="object-cover" />
      </div>
      <div className="bg-indigo-400 p-4 w-full flex flex-col items-start justify-start">
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
            onClick={() =>
              setShowDescription((prevShowDescription) => !prevShowDescription)
            }
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
