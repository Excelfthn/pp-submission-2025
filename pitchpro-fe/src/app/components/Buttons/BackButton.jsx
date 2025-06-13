import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function BackButton({onClick,text}) {
  return (
    <>
      <button onClick={onClick} className="flex flex-row gap-2 items-center p-2 pl-0 text-body text-neutral-300 font-semibold text">
        <FontAwesomeIcon icon={faArrowLeft} className="w-[29px] h-[29px]" />
        {text ? text: ''}
      </button>
    </>
  );
}
