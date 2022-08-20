import { faCheck, faSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  ApprovalButtonProperty,
  ApprovalButtonsProps,
  CourseAction,
  possibleCourseAction,
} from "@/appTypes/typesForUs";

const ApprovalButtons = ({
  runOnSelect,
  runOnReject,
  runOnApprove,
  selected,
  vertical,
}: ApprovalButtonsProps) => {
  const buttonProperty = {
    approve: {
      color: "bg-green-500 text-white",
      onClick: runOnApprove,
      content: <FontAwesomeIcon icon={faCheck} />,
    },
    select: {
      color: "bg-yellow-400 text-yellow-600",
      onClick: runOnSelect,
      content: selected ? (
        <FontAwesomeIcon icon={faSquare} fontWeight={900} />
      ) : null,
    },
    reject: {
      color: "bg-red-500 text-white",
      onClick: runOnReject,
      content: <FontAwesomeIcon icon={faX} />,
    },
  } as Record<CourseAction, ApprovalButtonProperty>;

  return (
    <div
      className={`flex justify-around ${
        vertical ? "flex-col" : ""
      } items-center gap-2 pointer-events-auto`}
    >
      {possibleCourseAction.map((courseAction: CourseAction) => {
        const { color, content, onClick } = buttonProperty[courseAction];
        return (
          <button
            key={courseAction}
            onClick={(e) => {
              onClick();
              e.stopPropagation();
            }}
            className={`p-2 w-8 h-8 flex justify-center items-center rounded-lg ${color}`}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default ApprovalButtons;
