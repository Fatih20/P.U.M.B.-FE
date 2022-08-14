import React, { useState } from "react";
import {
  CourseColorAndText,
  CourseForInstructorProps,
} from "../../types/typesForUs";

import Course from "./Course";
import TagName from "../TagName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CourseStatus } from "../../types/typesFromBackEnd";

const statusColorAndText = {
  REJECTED: { color: "bg-red-500", text: "Rejected" },
  VERIFIED: { color: "bg-green-600", text: " student enrolled" },
  VERIFYING: { color: "bg-yellow-500", text: "Waiting list" },
} as Record<CourseStatus, CourseColorAndText>;

const CourseForInstructor = ({
  title,
  description,
  status,
  peopleEnrolled,
  thumbnail,
  id,
}: CourseForInstructorProps) => {
  // console.log(status);
  // console.log(statusColorAndText[status]);
  const bottomContent = (
    <div
      className={`p-2 ${statusColorAndText[status]["color"]} w-full flex items-center justify-center`}
    >
      <p>{`${peopleEnrolled ?? ""}${statusColorAndText[status]["text"]}`}</p>
    </div>
  );
  const centerContent = (
    <>
      <h2 className="text-2xl font-bold whitespace-normal">{title}</h2>
    </>
  );
  return (
    <Course
      id={id}
      centerContent={centerContent}
      thumbnail={thumbnail}
      bottomContent={bottomContent}
      title={title}
      description={description}
    />
  );
};

export default CourseForInstructor;
