// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Dashboard from "./pages/Dashboard";
// import UsersPage from "./pages/UsersPage";
// import DepartmentsPage from "./pages/DepartmentsPage";
// import TasksPage from "./pages/TasksPage";
// import ReportsPage from "./pages/ReportsPage";
// import Health from "./pages/Health";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         <Route
//           path="/dashboard"
//           element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
//         />
//         <Route
//           path="/users"
//           element={<ProtectedRoute><UsersPage /></ProtectedRoute>}
//         />
//         <Route
//           path="/departments"
//           element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>}
//         />
//         <Route
//           path="/tasks"
//           element={<ProtectedRoute><TasksPage /></ProtectedRoute>}
//         />
//         <Route
//           path="/reports"
//           element={<ProtectedRoute><ReportsPage /></ProtectedRoute>}
//         />
//         <Route
//           path="/health"
//           element={<ProtectedRoute><Health /></ProtectedRoute>}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import TasksPage from "./pages/TasksPage";
import ReportsPage from "./pages/ReportsPage";
import Health from "./pages/Health";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/users"
        element={<ProtectedRoute><UsersPage /></ProtectedRoute>}
      />
      <Route
        path="/departments"
        element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>}
      />
      <Route
        path="/tasks"
        element={<ProtectedRoute><TasksPage /></ProtectedRoute>}
      />
      <Route
        path="/reports"
        element={<ProtectedRoute><ReportsPage /></ProtectedRoute>}
      />
      <Route
        path="/health"
        element={<ProtectedRoute><Health /></ProtectedRoute>}
      />
    </Routes>
  );
}
