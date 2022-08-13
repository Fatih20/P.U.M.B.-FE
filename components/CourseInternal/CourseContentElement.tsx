import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { CourseContentElementProps } from "../../types/TypesForUs";

const CourseContentElement = ({
  title,
  type,
  runOnDelete,
  runOnEdit,
}: CourseContentElementProps) => {
  return (
    <div className="w-full flex gap p-2">
      <h3 className="block">{title}</h3>
      <div className="flex flex-grow"></div>
      <div className="flex flex-row items-center justify-center">
        <button
          className="flex items-center justify-center p-2"
          onClick={runOnEdit}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          className="flex items-center justify-center p-2"
          onClick={runOnDelete}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CourseContentElement;
