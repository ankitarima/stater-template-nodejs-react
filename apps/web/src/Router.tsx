import { ReactNode, Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AuthLayout from "./components/layout/auth-layout";
import ForgetPassword from "./components/auth/forgot-password";
import PasswordReset from "./components/auth/password-reset";
import { useSession } from "./store/session.store";
import AdminLayout from "./components/layout/admin-layout";
import Layout from "./components/layout/layout";
import Landing from "./pages/landing";
import Dashboard from "./pages/admin/dashboard";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  // return <>{children}</>;
  const { user } = useSession();
  if (user?.id) {
    return <>{children}</>;
  } else return <Navigate to={"/auth/login"} />;
};

export const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/forgot-password"
            element={
              <AuthLayout>
                <ForgetPassword />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/password-reset/:hash"
            element={
              <AuthLayout>
                <PasswordReset />
              </AuthLayout>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
