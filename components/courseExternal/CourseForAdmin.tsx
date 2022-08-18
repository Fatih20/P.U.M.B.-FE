import React, { useState } from "react";
import Course from "./Course";
import { CourseForAdminProps } from "../../types/typesForUs";
import ApprovalButtons from "../ApprovalButtons";

const CourseForAdmin = ({
  title,
  instructor,
  description,
  selected,
  thumbnail,
  runOnApprove,
  runOnReject,
  runOnSelect,
  id,
}: CourseForAdminProps) => {
  const absoluteContent = (
    <div className='absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end pointer-events-none'>
      <ApprovalButtons
        runOnApprove={runOnApprove}
        runOnReject={runOnReject}
        runOnSelect={runOnSelect}
        selected={selected}
        vertical={true}
      />
    </div>
  );

  const centerContent = (
    <>
      <h2 className='text-2xl font-bold whitespace-normal'>{title}</h2>
      <h3 className='whitespace-normal text-lg font-medium'>{instructor}</h3>
    </>
  );

  return (
    <Course
      id={id}
      thumbnail={thumbnail}
      absoluteContent={absoluteContent}
      centerContent={centerContent}
      title={title}
      description={description}
    ></Course>
  );
};

export default CourseForAdmin;
