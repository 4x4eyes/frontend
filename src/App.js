import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginButton from "./components/LoginButton";
import Nav from "./components/Nav";
import UserMatchesList from "./components/UserMatchesList";
import { LoginContext } from "./contexts/LoginContext";

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ user, setUser }}>
        <div>
          <Header />
          <Nav />
        </div>
        <div>
          <Routes>
            <Route path="find-matches" element={<UserMatchesList />} />
          </Routes>
        </div>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
