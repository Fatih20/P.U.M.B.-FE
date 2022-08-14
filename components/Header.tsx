import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { HeaderProps } from "../types/typesForUs";

const Header = ({ showBackButton }: HeaderProps) => {
  return (
    <div
      className={`w-full flex items-center ${
        showBackButton ? `justify-between` : `justify-center`
      } flex-row bg-indigo-600 fixed z-10 h-10 text-white`}
    >
      <button
        className={`${showBackButton ? "" : "hidden"}`}
        onClick={() => {
          location.assign("/");
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h1 className="font-semibold">App Name</h1>
      <button className={`${showBackButton ? "invisible" : "hidden"}`}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

export default Header;
