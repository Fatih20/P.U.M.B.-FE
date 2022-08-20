import { OverlayType } from "@/appTypes/typesForUs";
import { faFaceFrown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const overlayContent = {
  error: <FontAwesomeIcon icon={faFaceFrown} size='2x' />,
  loading: (
    <div className='animate-spin'>
      <FontAwesomeIcon icon={faSpinner} size='2x'></FontAwesomeIcon>
    </div>
  ),
  plain: <></>,
} as Record<OverlayType, JSX.Element>;

export default overlayContent;
