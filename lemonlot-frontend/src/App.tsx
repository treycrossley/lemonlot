import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound404";
import RegistrationPage from "@/pages/RegistrationPage";
import UserProfile from "@/pages/UserProfile";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
