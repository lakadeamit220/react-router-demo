import React from "react";
import {
  createBrowserRouter,
  Outlet,
  Link,
  RouterProvider,
} from "react-router-dom";
import {
  DashboardLayout,
  DashboardHome,
  DashboardSettings,
} from "./components/DashboardLayout";
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
import { UserProvider } from "./store/UserContext";

// Layout Component
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
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
      <Link to="/fetch">Fech Posts</Link>
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
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // Default route
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> }, // Default dashboard view
      { path: "settings", element: <DashboardSettings /> },
    ],
  },
  {
    path: "fetch",
    element: <Posts />,
    loader: fetchPosts, // Proper use of loader
  },
  {
    path: "users",
    element: <UserFetch />,
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
    path: "form",
    element: <ContactForm />,
    action: handleFormSubmission,
  },
  {
    path: "success",
    element: <SuccessPage />,
  },
]);

// App Component
function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
