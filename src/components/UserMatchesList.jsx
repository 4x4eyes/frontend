import React, { useEffect, useState } from "react";
import { getMatches } from "../api";
import IndividualUser from "./IndividualUser";

export const UserMatchesList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    setIsLoading(true);
    getMatches(user.nickname)
      .then((matchesList) => {
        setMatches(matchesList);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr("Page not found");
        setIsLoading(false);
      });
  }, [user.nickname]);

  if (err) return <p className="error">{err}</p>;

  if (isLoading) return <p className="loading">Loading...</p>;

  return (
    <section className="matches">
      <ul>
        {matches.map((match) => {
          return <IndividualUser className="matches__match" key={match.username} match={match} />;
        })}
      </ul>
    </section>
  );
};

export default UserMatchesList;
