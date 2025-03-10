import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Outlet,
  Link,
  RouterProvider,
} from "react-router-dom";
const DashboardLayout = React.lazy(() =>
  import("./components/DashboardLayout")
);
const DashboardHome = React.lazy(() =>
  import("./components/DashboardLayout").then((module) => ({
    default: module.DashboardHome,
  }))
);
const DashboardSettings = React.lazy(() =>
  import("./components/DashboardLayout").then((module) => ({
    default: module.DashboardSettings,
  }))
);

import { Posts, fetchPosts } from "./components/DataFetchLoader";
import {
  ErrorFallback,
  fetchUserDetails,
  fetchUsers,
  UserDetails,
  UserFetch,
  Users,
} from "./components/UserFetch";
import "./App.css";
import {
  ContactForm,
  handleFormSubmission,
  SuccessPage,
} from "./components/ContactFormSubmit";
import { UserProvider, useUser } from "./store/UserContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingMain from "./components/LoadingMain";
import { MantineProvider } from "@mantine/core";
import Logout from "./components/Logout";
import Register from "./components/Register"; // Import Register component

// Layout Component
function Layout() {
  const { isLoggedIn, user } = useUser();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        {isLoggedIn ? (
          <>
            <span>Welcome, {user?.username}!</span>
            <Logout />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link> {/* Register link */}
          </>
        )}
      </nav>
      <hr />
      <Outlet /> {/* The Outlet component renders the matched child route */}
    </div>
  );
}

// Page Components
function Home() {
  return (
    <>
      <h2>Home Page</h2>
      <Link to="/dashboard">Go to Dashboard</Link>
      <br />
      <Link to="/fetch">Fetch Posts</Link>
      <br />
      <Link to="/users">Users</Link>
      <br />
      <Link to="/form">Form</Link>
    </>
  );
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
        <Layout />
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> }, // Default route after login
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/login",
    element: <Login />, // Default route
  },
  {
    path: "/register", // Register route
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<LoadingMain />}>
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      { index: true, element: <DashboardHome /> }, // Default dashboard view
      { path: "settings", element: <DashboardSettings /> },
    ],
  },
  {
    path: "/fetch",
    element: (
      <ProtectedRoute>
        <Posts />
      </ProtectedRoute>
    ),
    loader: fetchPosts,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <UserFetch />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Users />, loader: fetchUsers },
      {
        path: ":id",
        element: <UserDetails />,
        loader: fetchUserDetails,
        errorElement: <ErrorFallback />,
      },
    ],
  },
  {
    path: "/form",
    element: (
      <ProtectedRoute>
        <ContactForm />
      </ProtectedRoute>
    ),
    action: handleFormSubmission,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

// App Component
function App() {
  return (
    <MantineProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </MantineProvider>
  );
}

export default App;
