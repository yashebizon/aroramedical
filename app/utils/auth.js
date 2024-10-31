import axios from "axios";

export const login = async (username, password) => {
  try {
    // Make the POST request to the authentication endpoint
    const response = await axios.post(
      "https://aroramedical.ebizonstaging.com/wp-json/jwt-auth/v1/token",
      {
        username,
        password,
      }
    );

    if (response.status === 200) {
      const token = response.data.token;
      const username = response.data.user_display_name;
      const email = response.data.user_email;
      const user_id = response.data.user_id;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("user_id", user_id);

      return { success: true, token };
    } else {
      return {
        success: false,
        error: "Authentication failed. Please check your credentials.",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Authentication failed. Please check your credentials.",
    };
  }
};
