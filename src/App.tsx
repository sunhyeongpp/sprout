import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Board from "./pages/Board";
import BoardDetail from "./pages/BoardDetail";
import Search from "./pages/Search";
import User from "./pages/User";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="board/:id" element={<Board />} />
        <Route path="board/:id/:postId" element={<BoardDetail />} />
        <Route path="search/:query" element={<Search />} />
        <Route path="user/:id" element={<User />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
