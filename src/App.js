import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import UpdateProfile from "./components/UpdateProfile";
import UserMatchesList from "./components/UserMatchesList";
import IndividualSession from "./components/IndividualSession";
import { SessionsList } from "./components/SessionsList";
import CreateUser from "./components/CreateUser";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "./api";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";

function App() {
  const { user, isAuthenticated, isAuth0Loading } = useAuth0();
  const [dbUser, setDBUser] = useState({});

  return (
    <BrowserRouter>
      <div>
        <Header
          user={user}
          isAuthenticated={isAuthenticated}
          isAuth0Loading={isAuth0Loading}
        />
        <Nav />
        <Profile className="profile-container"
        user={user}
        isAuthenticated={isAuthenticated}
        isAuth0Loading={isAuth0Loading}
      />
      </div>
      <div>
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<SessionsList user={user} />} />
            <Route
              path="find-matches"
              element={<UserMatchesList user={user} />}
            />
            <Route
              path="update-profile/:username"
              element={<UpdateProfile user={user} />}
            />
            <Route path="session/:session_id" element={<IndividualSession />} />
          </Routes>
        ) : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
