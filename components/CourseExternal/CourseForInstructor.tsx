import React, { useState } from "react";
import {
  CourseColorAndText,
  CourseForInstructorProps,
  CourseStatus,
} from "../../types/TypesForUs";
import Course from "./Course";
import TagName from "../TagName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const statusColorAndText = {
  rejected: { color: "bg-red-500", text: "Rejected" },
  verified: { color: "bg-green-600", text: " student enrolled" },
  waiting: { color: "bg-yellow-500", text: "Waiting list" },
} as Record<CourseStatus, CourseColorAndText>;

const CourseForInstructor = ({
  name,
  description,
  status,
  peopleEnrolled,
  thumbnail,
}: CourseForInstructorProps) => {
  const bottomContent = (
    <div
      className={`p-2 ${statusColorAndText[status]["color"]} w-full flex items-center justify-center`}
    >
      <p>{`${peopleEnrolled ?? ""}${statusColorAndText[status]["text"]}`}</p>
    </div>
  );
  const centerContent = (
    <>
      <h2 className="text-2xl font-bold whitespace-normal">{name}</h2>
    </>
  );
  return (
    <Course
      centerContent={centerContent}
      thumbnail={thumbnail}
      bottomContent={bottomContent}
      name={name}
      description={description}
    />
  );
};

export default CourseForInstructor;
