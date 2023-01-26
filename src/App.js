import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import UpdateProfile from "./components/UpdateProfile";
import UserMatchesList from "./components/UserMatchesList";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <div>
        <Header
          user={user}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
        <Nav />
      </div>
      <div>
        <Routes>
          <Route path="find-matches" element={<UserMatchesList />} />
          <Route
            path="update-profile/:username"
            element={<UpdateProfile user={user} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
