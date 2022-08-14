import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderProps } from "../types/typesForUs";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../utils/api/auth";

const Header = ({ showBackButton, showLogoutButton }: HeaderProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleLogout } = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("me");
    },
  });

  return (
    <div
      className={`w-full flex items-center justify-between flex-row bg-indigo-600 fixed z-10 h-10 text-white px-3`}
    >
      <button
        className={`${showBackButton ? "" : "invisible"}`}
        onClick={() => {
          location.assign("/");
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h1 className="font-semibold">App Name</h1>
      <button
        onClick={async () => await handleLogout()}
        className={`${showLogoutButton ? "" : "invisible"}`}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
};

export default Header;
