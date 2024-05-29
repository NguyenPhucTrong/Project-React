import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./compoments/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-in" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
