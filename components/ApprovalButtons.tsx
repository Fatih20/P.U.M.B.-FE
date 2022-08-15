import { faCheck, faSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  ApprovalButtonProperty,
  ApprovalButtonsProps,
  CourseAction,
  possibleCourseAction,
} from "../types/typesForUs";

const ApprovalButtons = ({
  runOnSelect,
  runOnReject,
  runOnApprove,
  selected,
  vertical,
}: ApprovalButtonsProps) => {
  // function onSelectClick() {
  //   if (selected) {
  //     console.log("Bruh");
  //     runOnSelect();
  //   } else {
  //     runOnDeselect();
  //   }
  // }

  const buttonProperty = {
    approve: {
      color: "bg-green-500",
      onClick: runOnApprove,
      content: <FontAwesomeIcon icon={faCheck} />,
    },
    reject: {
      color: "bg-red-800",
      onClick: runOnReject,
      content: <FontAwesomeIcon icon={faX} />,
    },
    select: {
      color: "bg-gray-400",
      onClick: () => {
        runOnSelect(selected);
      },
      content: selected ? <FontAwesomeIcon icon={faSquare} /> : null,
    },
  } as Record<CourseAction, ApprovalButtonProperty>;

  if (selected) {
    console.log("Bruh3");
  }

  return (
    <div
      className={`flex ${
        vertical ? "flex-col" : ""
      } items-center justify-center gap-2 pointer-events-auto`}
    >
      {possibleCourseAction.map((courseAction: CourseAction) => {
        const { color, content, onClick } = buttonProperty[courseAction];
        return (
          <button
            key={courseAction}
            onClick={(e) => {
              console.log(onClick);
              onClick();
              e.stopPropagation();
            }}
            className={`p-2 w-8 h-8 flex justify-content items-center rounded-lg ${color}`}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default ApprovalButtons;
