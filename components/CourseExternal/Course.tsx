import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, {
  ReactComponentElement,
  ReactElement,
  useEffect,
  useState,
} from "react";

type CourseProps = {
  absoluteContent?: JSX.Element;
  centerContent: JSX.Element;
  bottomContent?: JSX.Element;
  thumbnail: string;
  description: string;
  title: string;
  useDropdownDescription?: Boolean;
};

const Course = ({
  absoluteContent,
  centerContent,
  description,
  bottomContent,
  thumbnail,
  title,
  useDropdownDescription = true,
}: CourseProps) => {
  const [showDescription, setShowDescription] = useState(false);
  useEffect(() => {
    console.log(showDescription);
  });

  return (
    <div className="relative  bg-gray-600 overflow-hidden rounded-xl w-64 flex flex-col items-start justify-center break-all">
      {absoluteContent ?? null}
      <div className="">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="bg-gray-400 p-4 w-full flex flex-col items-start justify-start">
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
