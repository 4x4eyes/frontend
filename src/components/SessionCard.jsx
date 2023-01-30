import { Link } from "react-router-dom";

export const SessionCard = ({ session_id, sessionPair }) => {
  return (
    <li>
      <p>
        <Link to={`session/${session_id}`}>{sessionPair}</Link>
      </p>
    </li>
  );
};
