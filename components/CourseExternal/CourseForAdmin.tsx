import React from "react";
import Course from "./Course";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@fortawesome/fontawesome-svg-core";

const possibleCourseAction = ["approve", "reject", "select"] as const;
export type CourseAction = typeof possibleCourseAction[number];

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

interface ButtonProperty {
  color: string;
  onClick: () => void;
  content: JSX.Element | JSX.Element[];
}

type ActionButtonProps = {
  type: CourseAction;
  color: string;
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
};

const ActionButton = ({
  type,
  children,
  onClick,
  color,
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 w-8 h-8 flex justify-content items-center rounded-lg ${color}`}
    >
      {children}
    </button>
  );
};

const CourseForAdmin = ({
  title,
  instructor,
  shortenedDescription,
  selected,
  thumbnail,
  runOnSelect,
  runOnReject,
  runOnApprove,
  runOnDeselect,
}: CourseForAdminProps) => {
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
  } as Record<CourseAction, ButtonProperty>;

  function onSelectClick() {
    if (selected) {
      runOnSelect();
    } else {
      runOnDeselect();
    }
  }
  const absoluteContent = (
    <div className="absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end">
      <div className="flex flex-col items-center justify-center gap-2">
        {possibleCourseAction.map((courseAction: CourseAction) => {
          const { color, content, onClick } = buttonProperty[courseAction];
          return (
            <ActionButton
              key={courseAction}
              onClick={onClick}
              type={courseAction}
              color={color}
            >
              {content}
            </ActionButton>
          );
        })}
      </div>
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
