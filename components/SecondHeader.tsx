import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { HeaderProps } from "../types/typesForUs";

const Header = ({ showBackButton }: HeaderProps) => {
  return (
    <div className="w-full bg-blue-400 h-15 fixed z-10">

      <div 
        className={`sm:w-6/12 p-4 flex mx-auto items-center ${showBackButton ? `justify-between` : `justify-center`
          } flex-row `}
      >
        <button
          className={`${showBackButton ? "" : "hidden"}`}
          onClick={() => {
            location.assign("/");
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1 className="font-bold">App Name</h1>
        <button className={`${showBackButton ? "invisible" : "hidden"}`}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
    </div>
  );
};

export default Header;
