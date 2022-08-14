import React from "react";

type ChangeSeenButtonProps = {
  runOnClick: () => void;
  selected: Boolean;
  buttonText: string;
};

const ChangeSeenButton = ({
  selected,
  runOnClick,
  buttonText,
}: ChangeSeenButtonProps) => {
  return (
    <button
      className={`p-1 ${
        selected ? "bg-gray-400 text-white" : "bg-transparent"
      } rounded-md `}
      onClick={runOnClick}
    >
      {buttonText}
    </button>
  );
};

export default ChangeSeenButton;
