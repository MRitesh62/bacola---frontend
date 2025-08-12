import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import classes from './Pwd.module.css'
const UpdatePwd = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // ✅ Retrieve email

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
    
        try {
            const response = await axios.put("http://localhost:8001/api/update-password", { 
                email: sessionStorage.getItem("email"),  // Retrieve stored email
                password 
            });
    
            alert(response.data.message);
            navigate("/login"); // Redirect to login after success
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };
    

    return (
        <div className={classes.div}>
            <h2>Update Password</h2><br/>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br/>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /><br/>
                <button type="submit" className="mt-4">Update Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdatePwd;
