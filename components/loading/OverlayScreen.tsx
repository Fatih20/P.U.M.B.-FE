import { faSpinner, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayType } from "../../types/typesForUs";

type LoadingScreenProps = {
  displayedText: string;
  overlayType?: OverlayType;
};

const OverlayScreen = ({
  displayedText,
  overlayType = "plain",
}: LoadingScreenProps) => {
  const overlayContent = {
    error: <FontAwesomeIcon icon={faFaceFrown} size='2x' />,
    loading: (
      <div className='animate-spin'>
        <FontAwesomeIcon icon={faSpinner} size='2x'></FontAwesomeIcon>
      </div>
    ),
    plain: <></>,
  } as Record<OverlayType, JSX.Element>;

  return (
    <div className='flex items-center justify-center flex-grow flex-col gap-2'>
      {overlayContent[overlayType]}
      <h2 className='font-medium text-lg'>{displayedText}</h2>
    </div>
  );
};

export default OverlayScreen;
