import React, { useEffect, useState } from "react";
import { getMatches, getSessions } from "../api";
import IndividualUser from "./IndividualUser";

export const UserMatchesList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sessionsError, setSessionsError] = useState("")
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getMatches(user.nickname)
      .then((matchesList) => {
        setMatches(matchesList);
      }).then(() => getSessions(user.nickname))
      .then(sessionList => setSessions(sessionList)).then(() => {
        setMatches(matches.map(match => {
          const temp = {...match}

          const matcher = sessions.filter(session => session.user_a_name === match.username || session.user_b_name === match.username)

          if (matcher[0]) {
            temp.session = matcher[0].session_id
          } else {
            temp.session = false;
          }
          return temp;
        }))
        
      setIsLoading(false)
      })
      .catch(e => {
      console.log(e.msg)
      setIsLoading(false)
      setSessionsError(e.msg)
      setError(e.msg)})
    }, [])

  
  
  return isLoading ? <p className="loading">Loading...</p> : (
    <section className="matches">
      <ul>
        {error ? <p>{error}</p> : null}
        {matches.map((match) => <IndividualUser className="matches__match" key={match.username} match={match} user={user} sessions={sessions} sessionsError={sessionsError} isLoading={isLoading}/>)}
      </ul>
    </section>
  );
};

export default UserMatchesList;
