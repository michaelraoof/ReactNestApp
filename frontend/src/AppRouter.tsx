import { type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./stores/store";

import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

function Protected({ children }: { children: JSX.Element }) {
  const token = useUserStore((state) => state.token);
  return token ? children : <Navigate to="/signup" replace />;
}
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
