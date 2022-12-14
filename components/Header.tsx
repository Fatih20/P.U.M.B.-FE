import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderProps } from "@/appTypes/typesForUs";
import { useQueryClient } from "react-query";
import { deleteAccessToken } from "@/utils/api/auth";
import { useRouter } from "next/router";

const Header = ({ showBackButton, showLogoutButton }: HeaderProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  function handleLogout() {
    deleteAccessToken();
    queryClient.invalidateQueries();
    router.push("/login");
  }

  return (
    <div
      className={`w-full flex items-center justify-center bg-indigo-600 fixed z-10 h-10 text-white px-3`}
    >
      <div className='flex items-center justify-between max-w-3xl w-full'>
        <button
          className={`${showBackButton ? "" : "invisible"}`}
          onClick={() => {
            window.history.back();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1 className='font-bold'>App Name</h1>
        <button
          onClick={handleLogout}
          className={`${showLogoutButton ? "" : "invisible"}`}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Header;
