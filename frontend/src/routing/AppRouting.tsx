import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import {
  AuthenticationPage,
  ChatDetailPage,
  HomePage,
  NotFoundPage,
} from "../pages";
import AppLayout from "../layouts/AppLayout";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, login } = useAuth();
  console.log("🔒 ProtectedRoute:", { isAuthenticated });

  if (!isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

const AppRouting = () => {
  console.log("🛣️ AppRouting rendres");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<AuthenticationPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          <Route path="/chat/:id" element={<ChatDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
