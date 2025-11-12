import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './stores/store'; // Fix this import

import SignUp from './pages/Signup';



export default function AppRouter() {
  const token = useUserStore((s) => s.token); // Fix this
  const loadProfile = useUserStore((s) => s.loadProfile); // Fix this

  useEffect(() => {
    if (token) loadProfile();
  }, [token, loadProfile]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}