import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import AllConversationsPage from "./components/AllConversationsPage";
import ProfilePage from "./components/ProfilePage";
import AllProfilesPage from "./components/AllProfilesPage";
import EditProfilePage from "./components/EditProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllConversationsPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/all-profiles" element={<AllProfilesPage />}></Route>
        <Route path="/profile/" element={<ProfilePage />}></Route>
        <Route path="/profile/edit" element={<EditProfilePage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
