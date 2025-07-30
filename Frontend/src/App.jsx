import { Route, Routes, Navigate } from "react-router";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
}

const App = () => {
  return (
  <div className="relative h-full w-full">
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
    [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          < HomePage />
        </PrivateRoute>
      }/>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }/>
      <Route path="/signup" element={ 
        <PublicRoute>
          < SignUpPage />
        </PublicRoute>
      }/> 
      <Route path="/create" element={
        <PrivateRoute>
          < CreatePage />
        </PrivateRoute>
      }/>
      <Route path="/note/:id" element={
        <PrivateRoute>
          < NoteDetailPage />
        </PrivateRoute>
      }/>
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  </div>
  );
};
export default App;