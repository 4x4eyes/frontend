import React, { useEffect, useState } from "react";

import { getSessions } from "../api";
import { SessionCard } from "./SessionCard";

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
      <h2 className="sessionsList__header">{user.nickname}'s Chats</h2>

      {sessions.length > 0 ? (
        <ul className="sessionsList__sessionCard">
          {sessions.map((session) => {
            return (
              <SessionCard
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
