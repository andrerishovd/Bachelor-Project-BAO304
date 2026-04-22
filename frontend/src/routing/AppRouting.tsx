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
  ChatsPage,
  SearchResultPage,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat/new" element={<ChatDetailPage isNew={true} />} />
          <Route path="/chat/:chatId" element={<ChatDetailPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/search" element={<SearchResultPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
