import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import UpdateProfile from "./components/UpdateProfile";
import UserMatchesList from "./components/UserMatchesList";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isAuth0Loading } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

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
        <Routes>
          <Route
            path="find-matches"
            element={
              <UserMatchesList
                user={user}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          {user ? (
            <Route
              path={`update-profile/${user.nickname}`}
              element={<UpdateProfile user={user} />}
            />
          ) : null}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
