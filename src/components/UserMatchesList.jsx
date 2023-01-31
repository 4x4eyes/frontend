import React, { useEffect, useState } from "react";
import { getMatches, getSessions } from "../api";
import IndividualUser from "./IndividualUser";

export const UserMatchesList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sessionsError, setSessionsError] = useState("");

  useEffect(() => {
    let tempMatches;
    let tempSessions;
    setIsLoading(true);
    getMatches(user.nickname)
      .then((matchesList) => {
        tempMatches = matchesList;
      })
      .then(() => getSessions(user.nickname))
      .then((sessionList) => {
        tempSessions = sessionList;
      })
      .then(() => {
        setMatches(() => {
          return tempMatches.map((match) => {
            const temp = { ...match };

            const matcher = tempSessions.filter(
              (session) =>
                session.user_a_name === match.username ||
                session.user_b_name === match.username
            );

            if (matcher[0]) {
              temp.session = matcher[0].session_id;
            } else {
              temp.session = false;
            }
            return temp;
          });
        });

        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setSessionsError(e.msg);
        setError(e.msg);
      });
  }, []);

  return isLoading ? (
    <p className="loading">Loading...</p>
  ) : (
    <section className="matches">
      <ul>
        {error ? <p>{error}</p> : null}
        {matches.map((match) => (
          <IndividualUser
            className="matches__match"
            key={match.username}
            match={match}
            user={user}
            sessionsError={sessionsError}
            isLoading={isLoading}
          />
        ))}
      </ul>
    </section>
  );
};

export default UserMatchesList;
