import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  showBackButton: Boolean;
};

const Header = ({ showBackButton }: HeaderProps) => {
  return (
    <div
      className={`w-full p-4 flex items-center ${
        showBackButton ? `justify-between` : `justify-center`
      } flex-row bg-gray-600 fixed z-10 h-8`}
    >
      <button
        className={`${showBackButton ? "" : "hidden"}`}
        onClick={() => {
          location.assign("/");
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h1>App Name</h1>
      <button className={`${showBackButton ? "invisible" : "hidden"}`}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

export default Header;
