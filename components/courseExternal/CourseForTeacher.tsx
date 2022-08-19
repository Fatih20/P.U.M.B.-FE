import React, { useState } from "react";
import {
  CourseColorAndText,
  CourseForTeacherProps,
} from "@/appTypes/typesForUs";

import Course from "@/components/courseExternal/Course";
import { CourseStatus } from "@/appTypes/typesFromBackEnd";

const statusColorAndText = {
  REJECTED: {
    textColor: "red-500",
    text: "Rejected",
    color: "red-200",
  },
  VERIFIED: {
    textColor: "green-600",
    text: " student enrolled",
    color: "green-200",
  },
  VERIFYING: {
    textColor: "yellow-500",
    text: "Waiting list",
    color: "yellow-200",
  },
} as Record<CourseStatus, CourseColorAndText>;

const CourseForTeacher = ({
  title,
  description,
  status,
  peopleEnrolled,
  thumbnail,
  id,
}: CourseForTeacherProps) => {
  const bottomContent = (
    <div
      className={`p-2 bg-${statusColorAndText[status]["color"]} text-${statusColorAndText[status]["textColor"]} font-medium w-full flex items-center justify-center`}
    >
      <p>{`${status === "VERIFIED" ? peopleEnrolled : ""}${
        statusColorAndText[status]["text"]
      }`}</p>
    </div>
  );
  const centerContent = (
    <>
      <h2 className='text-2xl font-bold truncate'>{title}</h2>
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

export default CourseForTeacher;
