import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { CourseContentElementProps } from "@/appTypes/typesForUs";

const CourseContentElement = ({
  title,
  isTeacher = false,
  runOnDelete,
  runOnEdit,
  runOnClick,
}: CourseContentElementProps) => {
  return (
    <div
      onClick={runOnClick}
      className='w-full flex gap p-2 bg-indigo-600 text-white rounded-md cursor-pointer items-center'
    >
      <h3 className='block'>{title}</h3>
      <div className='flex flex-grow'></div>
      <div
        className={`flex flex-row items-center justify-center ${
          isTeacher ? "" : "hidden"
        }`}
      >
        <button
          className='flex items-center justify-center p-2'
          onClick={(e) => {
            e.stopPropagation();
            runOnEdit();
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          className='flex items-center justify-center p-2'
          onClick={(e) => {
            e.stopPropagation();
            runOnDelete();
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CourseContentElement;
