import React from "react";
import Course from "./Course";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import {
  ApprovalButtonProperty,
  CourseAction,
  possibleCourseAction,
} from "../../types/types";
import ApprovalButton from "../ApprovalButtons";
import ApprovalButtons from "../ApprovalButtons";

type CourseForAdminProps = {
  title: string;
  instructor: string;
  shortenedDescription: string;
  // Link to the image, not an actual image
  thumbnail: string;
  runOnReject: () => void;
  runOnApprove: () => void;
  runOnSelect: () => void;
  runOnDeselect: () => void;
  // The logic for saving what course is selected is left to its parent. It is assumed that the parent will have a state containing an array and the selected props will be given by using array .includes
  selected: Boolean;
};

const CourseForAdmin = ({
  title,
  instructor,
  shortenedDescription,
  selected,
  thumbnail,
  runOnApprove,
  runOnDeselect,
  runOnReject,
  runOnSelect,
}: CourseForAdminProps) => {
  const absoluteContent = (
    <div className="absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end">
      <ApprovalButtons
        runOnApprove={runOnApprove}
        runOnDeselect={runOnDeselect}
        runOnReject={runOnReject}
        runOnSelect={runOnSelect}
        selected={selected}
        vertical={true}
      />
    </div>
  );

  const centerContent = (
    <>
      <h2 className="text-2xl font-bold whitespace-normal">{title}</h2>
      <h3 className="whitespace-normal text-lg font-medium">{instructor}</h3>
      <p className="whitespace-normal">{shortenedDescription}</p>
    </>
  );

  return (
    <Course
      thumbnail={thumbnail}
      absoluteContent={absoluteContent}
      centerContent={centerContent}
    ></Course>
  );
};

export default CourseForAdmin;
