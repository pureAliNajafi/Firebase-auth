import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Layout from "./Layout";
import {
  RootPage,
  ItemDetailPage,
  Manage,
  SignInPage,
  SignUpPage,
  FogotPasswordPage,
  DashboardPage,
  UpdateProfilePage,
} from "./pages";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/auth/signUp" element={<PrivateRoute component={SignUpPage} />} />
            <Route path="/auth/signIn" element={<PrivateRoute component={SignInPage} />} />
            <Route path="/auth/forgot-password" element={<FogotPasswordPage />} />
            <Route
              path="/update-profile"
              element={<PrivateRoute component={UpdateProfilePage} />}
            />
            <Route path="/dashboard" element={<PrivateRoute component={DashboardPage} />} />
            <Route path="/Manage" element={<Manage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/" element={<RootPage />} />
            {/* Add a Firebase handler route */}
            <Route path="/__/auth/handler" element={<div>Loading...</div>} />

            <Route
              path="*"
              element={
                <div className="mt-[35vh] text-center">
                  (<span className="text-indigo-500">404</span>) Page Not Found
                </div>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
