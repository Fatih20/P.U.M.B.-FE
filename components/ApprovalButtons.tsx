import { faCheck, faSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  ApprovalButtonProperty,
  CourseAction,
  possibleCourseAction,
} from "../types/types";

type ApprovalButtonsProps = {
  runOnReject: () => void;
  runOnApprove: () => void;
  runOnSelect: () => void;
  runOnDeselect: () => void;
  selected: Boolean;
  vertical: Boolean;
};

const ApprovalButtons = ({
  runOnSelect,
  runOnReject,
  runOnApprove,
  runOnDeselect,
  selected,
  vertical,
}: ApprovalButtonsProps) => {
  function onSelectClick() {
    if (selected) {
      runOnSelect();
    } else {
      runOnDeselect();
    }
  }

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
      onClick: onSelectClick,
      content: selected ? <FontAwesomeIcon icon={faSquare} /> : null,
    },
  } as Record<CourseAction, ApprovalButtonProperty>;
  return (
    <div
      className={`flex ${
        vertical ? "flex-col" : ""
      } items-center justify-center gap-2`}
    >
      {possibleCourseAction.map((courseAction: CourseAction) => {
        const { color, content, onClick } = buttonProperty[courseAction];
        return (
          <button
            key={courseAction}
            onClick={onClick}
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
