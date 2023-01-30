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

function App() {
  const { user, isAuthenticated, isAuth0Loading } = useAuth0();

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
                element={<UpdateProfile user={user} />}
              />
              <Route
                path="session/:session_id"
                element={<IndividualSession user={user} />}
              />
            </Routes>
          </main>
        </div>
      ) : (
        <LoginButton />
      )}
    </BrowserRouter>
  );
}

export default App;
