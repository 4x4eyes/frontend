import React, { useEffect, useState } from "react";
import IndividualMessage from "./IndividualMessage";
import { getSessions } from "../api";

export const SessionsList = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    setIsLoading(true);
    getSessions("Dave")
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
  console.log(user, "<- user");
  return (
    <section>
      <h2>{user.username}'s Sessions</h2>
      <ul>
        {sessions.map((session) => {
          console.log(session);
          return (
            <IndividualMessage key={session.session_id} session={session} />
          );
        })}
      </ul>
    </section>
  );
};
