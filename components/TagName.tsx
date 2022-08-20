import React from "react";
import { TagProps } from "@/appTypes/typesForUs";

const TagName = ({ name, runOnClick }: TagProps) => {
  return (
    <button
      className='rounded-2xl bg-indigo-600 px-2 py-1 text-sm text-white'
      onClick={runOnClick}
    >
      {name}
    </button>
  );
};

export default TagName;
