import { Outlet, useLoaderData, Link } from "react-router-dom";

// Loader functions
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

async function fetchUserDetails({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
}

// Layout Component for User Management
function UserFetch() {
  return (
    <div>
      <h1>User Management</h1>
      <Outlet /> {/* Render nested routes here */}
    </div>
  );
}

// Users List Component
function Users() {
  const users = useLoaderData();
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link> {/* Link to user details */}
          </li>
        ))}
      </ul>
    </div>
  );
}

// User Details Component
function UserDetails() {
  const user = useLoaderData();
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}

function ErrorFallback({ error }) {
  // Check if error has a message or fallback to a generic error message
  const errorMessage = error?.message || "An unexpected error occurred.";
  return <div>Error: {errorMessage}</div>;
}


export { UserFetch, UserDetails, Users, fetchUserDetails, fetchUsers, ErrorFallback };
