import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full p-4 flex items-center justify-between flex-row bg-gray-600">
      <button
        onClick={() => {
          location.assign("/");
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h1>App Name</h1>
      <button className="invisible">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

export default Header;
