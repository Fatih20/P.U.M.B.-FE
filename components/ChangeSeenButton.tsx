import React from "react";

type ChangeSeenButtonProps = {
  runOnClick: () => void;
  selected: boolean;
  buttonText: string;
};

const ChangeSeenButton = ({
  selected,
  runOnClick,
  buttonText,
}: ChangeSeenButtonProps) => {
  return (
    <button
      className={`py-1 px-2 ${
        selected ? "bg-gray-400 text-white" : "bg-transparent"
      } rounded-md `}
      onClick={runOnClick}
    >
      {buttonText}
    </button>
  );
};

export default ChangeSeenButton;
