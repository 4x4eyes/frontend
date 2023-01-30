import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import UpdateProfile from "./components/UpdateProfile";
import UserMatchesList from "./components/UserMatchesList";
import { IndividualSession } from "./components/IndividualSession";
import { SessionsList } from "./components/SessionsList";
import CreateUser from "./components/CreateUser";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "./api";
import LoginButton from "./components/LoginButton";

function App() {
  const { user, isAuthenticated, isAuth0Loading } = useAuth0();

  return (
    <BrowserRouter>
      <div>
        <Header
          user={user}
          isAuthenticated={isAuthenticated}
          isAuth0Loading={isAuth0Loading}
        />
        <Nav />
      </div>
      <div>
        {isAuthenticated ? (
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
        ) : (
          <LoginButton />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
