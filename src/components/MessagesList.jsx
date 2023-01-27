import React, { useEffect, useState } from "react";
import IndividualMessage from "./IndividualMessage";
import { getMatches } from "../api";

export const MessagesList = ({ user, isLoading, setIsLoading }) => {
  const [sessions, setSessions] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    setIsLoading(true);
    getMatches(user.username)
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
    <section>
      <h2>{user.username}'s Messages</h2>
      <ul>
        {sessions.map((session) => {
          return (
            <IndividualMessage key={sessions.session_id} session={session} />
          );
        })}
      </ul>
    </section>
  );
};
