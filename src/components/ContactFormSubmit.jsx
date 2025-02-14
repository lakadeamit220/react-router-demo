import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";

// Action function
export async function handleFormSubmission({ request }) {
  try {
    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");

    // Server-side validation
    if (!name || !email) {
      return { error: "Both fields are required!" };
    }

    // Dummy API endpoint
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    // Redirect on success
    return redirect("/success");
  } catch (error) {
    // Return error message to the form
    return { error: error.message };
  }
}

// Form Component
function ContactForm() {
  const actionData = useActionData(); // Access action response, if any

  return (
    <div>
      <h1>Contact Us</h1>
      <Form method="post">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Submit</button>
      </Form>

      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
    </div>
  );
}

// Success Page
function SuccessPage() {
  return <h1>Form Submitted Successfully!</h1>;
}

export { ContactForm, SuccessPage };
