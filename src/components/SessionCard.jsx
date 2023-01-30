import { Link } from "react-router-dom";

export const SessionCard = ({ session_id, sessionPair }) => {
  return (
    <li className="sessionsList__sessionCard__li">
      <p>
        <Link className="sessionsList__sessionCard__li_Link" to={`session/${session_id}`}>{sessionPair}</Link>
      </p>
    </li>
  );
};
