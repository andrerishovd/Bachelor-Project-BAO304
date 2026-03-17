import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  AuthenticationPage,
  ChatDetailPage,
  HomePage,
  NotFoundPage,
} from "../pages";
import AppLayout from "../layouts/AppLayout";
import { useAuth } from "../hooks/useAuth";

/**
 * AppRouting Component
 *
 * Main routing configuration for the application.
 *
 * @routes
 * Public routes:
 * - /authentication - Login/signup page
 *
 * Protected routes (require login):
 * - / - Homepage with dashboard
 * - /chat/:id - Chat detail page with dynamic ID
 * - * - 404 Not Found page (catch-all)
 *
 * @pattern Nested Routes
 * Protected routes are nested under <ProtectedRoute> which:
 * 1. Checks authentication
 * 2. Wraps authenticated pages in AppLayout
 * 3. Redirects to login if not authenticated
 */

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

const AppRouting = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/authentication" element={<AuthenticationPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat/new" element={<ChatDetailPage isNew={true} />} />
            <Route path="/chat/:chatId" element={<ChatDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default AppRouting;
