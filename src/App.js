import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import UpdateProfile from "./components/UpdateProfile";
import UserMatchesList from "./components/UserMatchesList";
import { IndividualSession } from "./components/IndividualSession";
import { SessionsList } from "./components/SessionsList";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import { useState } from "react";

function App() {
  const { user, isAuthenticated, isAuth0Loading } = useAuth0();
  const [dbUser, setDbUser] = useState({});

  return (
    <BrowserRouter>
      <Header
        user={user}
        isAuthenticated={isAuthenticated}
        isAuth0Loading={isAuth0Loading}
      />
      {isAuthenticated ? (
        <div>
          <Nav />
          <Profile
            className="profile-container"
            user={user}
            isAuthenticated={isAuthenticated}
            isAuth0Loading={isAuth0Loading}
          />
          <main>
            <Routes>
              <Route path="/messages" element={<SessionsList user={user} />} />
              <Route
                path="find-matches"
                element={<UserMatchesList user={user} />}
              />
              <Route
                path="update-profile/:username"
                element={
                  <UpdateProfile
                    user={user}
                    dbUser={dbUser}
                    setDbUser={setDbUser}
                  />
                }
              />
              <Route
                path="session/:session_id"
                element={<IndividualSession user={user} />}
              />
            </Routes>
          </main>
        </div>
      ) : (
        <main>
          <div className="homepage__main">
            <h2>Welcome to I'm Board!</h2>
            <p>A place to connect with board game lovers in your local area.</p>
            <p>
              Please login to connect with people in your local area. If you've
              never visited the site before, please create an account.
            </p>
            <LoginButton />
          </div>
        </main>
      )}
    </BrowserRouter>
  );
}

export default App;
