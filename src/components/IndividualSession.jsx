import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages, getSessions } from "../api";

export const IndividualSession = ({ user }) => {
  const { session_id } = useParams();

  const [messages, setMessages] = useState([]);
  const [session, setSession] = useState();
  const [loadingSession, setLoadingSession] = useState(true);
  const [accessSession, setAccessSession] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    setAccessSession(false);
    setLoadingSession(true);
    getSessions(user.nickname)
      .then((resSessions) => {
        resSessions.forEach((resSession) => {
          if (resSession.session_id == session_id) {
            setSession(resSession);
            setAccessSession(true);
          }
        });
        setLoadingSession(false);
      })
      .catch((err) => {
        setErr("Page not found");
        setLoadingSession(false);
      });
  }, []);

  useEffect(() => {
    setLoadingMessages(true);
    getMessages(session_id)
      .then((resMessages) => {
        setMessages(resMessages);
        setLoadingMessages(false);
      })
      .catch((err) => {
        setErr("Page not found");
        setLoadingMessages(false);
      });
  }, []);

  if (err) return <p>{err}</p>;
  if (loadingSession) return <p>Loading...</p>;
  if (!accessSession) return <p>Access Denied</p>;

  return (
    <div>
      <h3>
        your conversation with{" "}
        {user.nickname === session.user_a_name
          ? session.user_b_name
          : session.user_a_name}
      </h3>

      {loadingMessages ? (
        "Loading"
      ) : (
        <ul>
          {messages.map((message) => {
            return (
              <li key={message.message_id}>
                {message.author_name}: {message.created_at} <br />{" "}
                {message.message_body}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
