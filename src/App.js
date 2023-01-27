import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import UpdateProfile from "./components/UpdateProfile";
import UserMatchesList from "./components/UserMatchesList";
import { MessagesList } from "./components/MessagesList";
import CreateUser from "./components/CreateUser";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "./api";

function App() {
  const { user, isAuthenticated, isAuth0Loading } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [dbUser, setDBUser] = useState({});

  // useEffect(
  //   (user) => {
  //     getUser(user.nickname).then((specificUser) => {
  //       specificUser.status === 200 ? setDBUser(specificUser) : setDBUser();
  //     });
  //   },
  //   [user]
  // );

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
          <Route
            path="messages"
            element={
              <MessagesList
                user={user}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
