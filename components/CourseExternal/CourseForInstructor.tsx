import React, { useState } from "react";
import { CourseColorAndText, CourseStatus } from "../../types/types";
import Course from "./Course";
import TagName from "../TagName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const statusColorAndText = {
  rejected: { color: "bg-red-500", text: "Rejected" },
  verified: { color: "bg-green-600", text: " student enrolled" },
  waiting: { color: "bg-yellow-500", text: "Waiting list" },
} as Record<CourseStatus, CourseColorAndText>;

type CourseForInstructorProps = {
  title: string;
  description: string;
  status: CourseStatus;
  peopleEnrolled?: number;
  // Link to the image, not an actual image
  thumbnail: string;
};

const CourseForInstructor = ({
  title,
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
      <h2 className="text-2xl font-bold whitespace-normal">{title}</h2>
    </>
  );
  return (
    <Course
      centerContent={centerContent}
      thumbnail={thumbnail}
      bottomContent={bottomContent}
      title={title}
      description={description}
    />
  );
};

export default CourseForInstructor;
