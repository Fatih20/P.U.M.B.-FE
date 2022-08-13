import React from "react";
import { TagProps } from "../types/TypesForUs";

const TagName = ({ name, runOnClick }: TagProps) => {
  return (
    <button
      className="rounded-2xl bg-gray-600 px-2 py-1 text-sm"
      onClick={runOnClick}
    >
      {name}
    </button>
  );
};

export default TagName;
