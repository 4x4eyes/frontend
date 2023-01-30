import React, { useEffect, useState } from "react";
import { SessionCard } from "./SessionCard";
import { getSessions } from "../api";

export const SessionsList = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    setIsLoading(true);
    getSessions(user.nickname)
      .then((result) => {
        setSessions(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr("Page not found");
        setIsLoading(false);
      });
  }, []);

  if (err) return <p>{err}</p>;

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="sessionsList">
      <h2>{user.nickname}'s Sessions</h2>
      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => {
            console.log(session);
            return (
              <SessionCard className="sessionsList__sessionCard"
                key={session.session_id}
                sessionPair={
                  user.nickname === session.user_a_name
                    ? session.user_b_name
                    : session.user_a_name
                }
                session_id={session.session_id}
              />
            );
          })}
        </ul>
      ) : (
        <p>
          You currently don't have any sessions. How about trying to connect
          with people on the Find Matches page?
        </p>
      )}
    </section>
  );
};
