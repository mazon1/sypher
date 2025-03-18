import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Connect to Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function for email login with magic link
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOtp({ email });
    
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage("Check your email for the login link!");
  };

  // Function for Google Sign-In
  const signInWithGoogle = async () => {
    console.log("Google sign-in button clicked!"); // Debugging log
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) {
        console.error("Google Sign-In Error:", error.message);
        setMessage(error.message);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* App Logo */}
      <img src="/logo.png" alt="Sypher Logo" style={{ width: "150px", marginBottom: "20px" }} />

      <h2>Sign in / Sign up</h2>

      {/* Email Sign-In Form */}
      <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Send Magic Link"}
        </button>
      </form>

      {/* Display Error or Success Messages */}
      {message && <p style={{ color: "red" }}>{message}</p>}

      {/* Google Sign-In Button with Local Logo */}
      <button onClick={signInWithGoogle} style={{
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img src="/google.png" 
          alt="Google Logo" 
          style={{ width: "20px", height: "20px", marginRight: "10px" }} 
        />
        Sign in with Google
      </button>
    </div>
  );
}
