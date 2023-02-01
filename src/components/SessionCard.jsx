import { Link } from "react-router-dom";

export const SessionCard = ({ session_id, sessionPair }) => {
  return (
    <Link
      className="sessionsList__sessionCard__li_Link"
      to={`/session/${session_id}`}
    >
      <li className="sessionsList__sessionCard__li">{sessionPair}</li>
    </Link>
  );
};
