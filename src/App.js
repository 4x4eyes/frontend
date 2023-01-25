import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import UserMatchesList from "./components/UserMatchesList";

function App() {

  return (
    <BrowserRouter>
        <div>
          <Header />
          <Nav />
        </div>
        <div>
          <Routes>
            <Route path="find-matches" element={<UserMatchesList />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
