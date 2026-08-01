import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome/Welcome";
import Session from "./pages/Session/Session";
import Expired from "./pages/Expired/Expired";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/session" element={<Session />} />
        <Route path="/expired" element={<Expired />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;