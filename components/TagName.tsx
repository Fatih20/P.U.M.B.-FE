import React from "react";

type Props = {
  tagName: string;
  // It is assumed that the function triggered here has the tagName built-in
  runOnClick: () => void;
};

const TagName = ({ tagName, runOnClick }: Props) => {
  return (
    <button
      className="rounded-2xl bg-gray-600 px-2 py-1 text-sm"
      onClick={runOnClick}
    >
      {tagName}
    </button>
  );
};

export default TagName;
