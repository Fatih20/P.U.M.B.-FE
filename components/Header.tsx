import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderProps } from "../types/typesForUs";
import { useQueryClient } from "react-query";
import { logout } from "../utils/api/auth";

const Header = ({ showBackButton, showLogoutButton }: HeaderProps) => {
  const queryClient = useQueryClient();

  return (
    <div
      className={`w-full flex items-center justify-center bg-indigo-600 fixed z-10 h-10 text-white px-3`}
    >
      <div className='flex items-center justify-between max-w-3xl w-full'>
        <button
          className={`${showBackButton ? "" : "invisible"}`}
          onClick={() => {
            location.assign("/");
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1 className='font-semibold'>App Name</h1>
        <button
          onClick={async () =>
            await logout(() => queryClient.invalidateQueries("me"))
          }
          className={`${showLogoutButton ? "" : "invisible"}`}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Header;
