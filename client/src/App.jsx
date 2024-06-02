import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "../../api/PrivateRouter";
import Header from "./components/Header";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-listing" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
