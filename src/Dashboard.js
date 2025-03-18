import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is where you will see your AI-powered health insights.</p>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default Dashboard;
