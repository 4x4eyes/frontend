import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages } from "../api";

export const IndividualSession = () => {
  const { session_id } = useParams();

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    setLoadingMessages(true);
    getMessages(session_id)
      .then((resMessages) => {
        setMessages(resMessages);
        console.log(resMessages);
        setLoadingMessages(false);
      })
      .catch((err) => {
        setErr("Page not found");
        setLoadingMessages(false);
      });
  }, []);

  return <p>This is working correctly</p>;
};
