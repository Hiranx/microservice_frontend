const API_BASE_URL = "http://localhost:8080"; // Replace with your actual API endpoint

// Login User
export const loginUser = async (credentials) => {
  console.log("API_BASE_URL", API_BASE_URL);
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Directly get the token as a string
    const token = await response.text(); // Use .text() instead of .json()

    console.log("Received token:", token);

    if (!response.ok) {
      throw new Error("Login failed");
    }

    // Save token to localStorage
    if (token) {
      localStorage.setItem("token", token);
    }

    return { success: true, token };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Register User (unchanged)
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Example of a request with token from localStorage
export const fetchProtectedData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { success: false, error: "No token found, please login." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/protected-endpoint`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Add token to Authorization header
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch protected data");
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
