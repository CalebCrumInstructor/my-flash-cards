import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Page404 from "./Page404";
import HomeFolder from "./HomeFolder";
import Starred from "./Starred";
import Login from "./Login";
import SignUp from "./SignUp";
import DeckEditor from "./DeckEditor";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home-folder" element={<HomeFolder />} />
      <Route path="/starred" element={<Starred />} />
      <Route path="/deck-editor/" element={<DeckEditor />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
