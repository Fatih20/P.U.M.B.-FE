import { faSpinner, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LoadingScreenProps, OverlayType } from "@/appTypes/typesForUs";
import overlayContent from "@/config/overlayContent";

const OverlayScreen = ({
  displayedText,
  overlayType = "plain",
}: LoadingScreenProps) => {
  return (
    <div className='flex items-center justify-center flex-grow flex-col gap-2'>
      {overlayContent[overlayType]}
      <h2 className='font-medium text-lg'>{displayedText}</h2>
    </div>
  );
};

export default OverlayScreen;
